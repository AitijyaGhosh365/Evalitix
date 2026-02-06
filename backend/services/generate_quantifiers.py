from google import genai
from google.genai import types
import pathlib
import os
import json

from dotenv import load_dotenv
load_dotenv() 


api_key = os.getenv("GEMINI_API_KEY")


client = genai.Client(
    api_key=api_key
)

# Retrieve and encode the PDF byte
# filepath = pathlib.Path('test.pdf')



def generate_quantifiers_llm(job_requirements : str):
  
        job_requirements = job_requirements.strip()

        system_prompt = '''
        You are an expert technical recruiter and evaluation system.
        Your task is to analyze the given job description and generate 15 CV-evaluatable quantifiers, each assigned a numeric weight based on importance to the role.

        Output Requirements:

        Return response in JSON only

        JSON format structure:

        {
          "quantifier_name_1": weight,
          "quantifier_name_2": weight,
          ...
          "quantifier_name_15": weight
        }


        Must generate atleast 30 quantifiers
        
        

        Each quantifier should represent one measurable evaluation criterion

        Each criterion must be objectively verifiable from a CV/resume

        Each criterion should be unique don't make redundant criterias
        
        
        Weights should reflect true priority of skills for the given role

        Avoid subjective traits unless measurable via portfolio/projects

        keep a miscellaneous worth wighht 5 always  

        Goal:

        Create a scoring dictionary that allows a candidate to be evaluated numerically and fairly based solely on their CV against the job specification

        '''

        system_prompt = system_prompt.strip()

        prompt = f'''

        {system_prompt}

        Job description :

        {job_requirements}

        '''

        response = client.models.generate_content(
            model="gemini-3-pro-preview",
            contents=prompt,
            config={
                "response_mime_type": "application/json",  # <--- Add this line
                "seed": 1234,
                "top_p": 0.9,
                "top_k": 40,
            }
        )
        
        parsed = json.loads(response.text)
        return parsed


if __name__ == '__main__':
  
  job_requirements = '''
  We are seeking a highly skilled Full-Stack Web Developer proficient in modern frontend and backend technologies to build, maintain, and scale high-performance web applications. The ideal candidate should have strong mastery of HTML5, CSS3, JavaScript (ES6+), React or Next.js, and experience with responsive UI frameworks like TailwindCSS or Material UI, along with state-management tools such as Redux, Zustand, Recoil, or Context API. Backend proficiency in Node.js (Express or NestJS) is essential, with the ability to design REST or GraphQL APIs, implement authentication/authorization (JWT, OAuth), and work effectively with SQL databases (MySQL/PostgreSQL) as well as NoSQL databases (MongoDB/Redis). The role also requires practical knowledge of deployment platforms like AWS, GCP, Vercel, or Netlify, familiarity with CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins), containerization (Docker), caching strategies, reverse proxies (Nginx), and performance optimization through bundle splitting, lazy loading, and Lighthouse benchmarking. Additional desirable skills include TypeScript, microservices architecture, automated testing frameworks (Jest, Cypress, Playwright), accessibility/SEO best practices, serverless computing (AWS Lambda/Cloudflare Workers), payment gateway integration, and real-time features using WebSockets/Socket.IO. A strong candidate will write clean, maintainable code, follow version control practices (Git), collaborate with UI/UX teams, integrate third-party APIs, handle production issues, and own end-to-end feature delivery with attention to scalability, reliability, and code quality.
  '''

  res = generate_quantifiers_llm(job_requirements)
  
  print(res)