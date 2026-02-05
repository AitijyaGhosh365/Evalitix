import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import type { RJSFSchema } from "@rjsf/utils";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  CircularProgress, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Divider
} from "@mui/material";
import { Sparkles, Send, AlertCircle, FileEdit } from "lucide-react";
import { apiFetch } from "../../lib/api";
import Navbar from "../../components/Navbar"; // Ensure path is correct

/* ---------------------------
    TYPES
---------------------------- */
interface FormFields {
  title: string;
  description: string;
  jobRequirements: string;
}

type FormStatus = "active" | "inactive" | "expired";

interface Quantifier {
  id: string;
  label: string;
  weight: number;
}

/* ---------------------------
    RJSF SCHEMA & UI
---------------------------- */
const editFormSchema: RJSFSchema = {
  type: "object",
  required: ["title", "description", "jobRequirements"],
  properties: {
    title: { type: "string", title: "Form Title" },
    description: { type: "string", title: "Form Description" },
    jobRequirements: { 
      type: "string", 
      title: "Job Requirements", 
      description: "Define the skills and experience required for this role." 
    },
  },
};

const uiSchema = {
  description: {
    "ui:widget": "textarea",
    "ui:options": { rows: 3 },
  },
  jobRequirements: {
    "ui:widget": "textarea",
    "ui:options": { rows: 6 },
  },
};

export default function FormEdit() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  // Typed State
  const [formData, setFormData] = useState<Partial<FormFields>>({});
  const [status, setStatus] = useState<FormStatus | null>(null);
  const [quantifiers, setQuantifiers] = useState<Quantifier[] | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [generating, setGenerating] = useState<boolean>(false);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [confirming, setConfirming] = useState<boolean>(false);

  useEffect(() => {
    if (!uuid) return;

    apiFetch(`/form/${uuid}`)
      .then(res => res.json())
      .then(data => {
        const form = data.form;
        setStatus(form.status);
        setFormData({
          title: form.title,
          description: form.description,
          jobRequirements: "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [uuid]);

  /* ---------------------------
      HANDLERS
  ---------------------------- */
  const generateQuantifiers = async (): Promise<void> => {
    if (!formData.jobRequirements?.trim()) {
      alert("Enter job requirements first");
      return;
    }
    setGenerating(true);
    try {
      const res = await apiFetch("/form/generate_quantifiers", {
        method: "POST",
        body: JSON.stringify({ jobRequirements: formData.jobRequirements }),
      });
      const data = await res.json();
      setQuantifiers(data.quantifiers);
    } catch {
      alert("Failed to generate quantifiers");
    } finally {
      setGenerating(false);
    }
  };

  const publishForm = async (): Promise<void> => {
    if (!uuid || !quantifiers) return;
    setPublishing(true);
    try {
      const res = await apiFetch(`/form/edit/${uuid}`, {
        method: "POST",
        body: JSON.stringify({ ...formData, quantifiers }),
      });
      if (!res.ok) throw new Error();
      navigate("/dashboard");
    } catch {
      alert("Failed to publish form");
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8faff" }}>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Block Editing UI
  if (status?.toLowerCase().trim() !== "inactive") {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8faff" }}>
        <Navbar />
        <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
          <Paper sx={{ p: 5, borderRadius: 4, border: '1px solid #fee2e2' }}>
            <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
            <Typography variant="h5" fontWeight={700} gutterBottom>Form Locked</Typography>
            <Typography color="text.secondary">
              This form is currently <b>{status}</b> and cannot be edited.
            </Typography>
            <Button variant="contained" sx={{ mt: 3, bgcolor: "#2563eb" }} onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8faff", pb: 10 }}>
      <Navbar />

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box sx={{ p: 1, bgcolor: '#dbeafe', borderRadius: 2, color: '#2563eb' }}>
            <FileEdit size={24} />
          </Box>
          <Typography variant="h4" fontWeight={800} color="#1e293b">
            Configure Your Form
          </Typography>
        </Box>

        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <Form
            schema={editFormSchema}
            uiSchema={uiSchema}
            validator={validator}
            formData={formData}
            onChange={e => setFormData(e.formData)}
          >
            <></> {/* Hides default RJSF submit button */}
          </Form>

          <Divider sx={{ my: 4 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Button
                variant="outlined"
                startIcon={generating ? <CircularProgress size={20} /> : <Sparkles size={18} />}
                onClick={generateQuantifiers}
                disabled={generating}
                sx={{ 
                  borderRadius: 2, 
                  px: 3, 
                  py: 1.5, 
                  textTransform: 'none', 
                  fontWeight: 700,
                  borderColor: '#2563eb',
                  color: '#2563eb'
                }}
              >
                {generating ? "AI is analyzing (This may take a few minutes)..." : "Generate AI Quantifiers"}
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: '#64748b' }}>
                * AI will extract key metrics from your job requirements.
              </Typography>
            </Box>

            {/* Quantifier Preview */}
            {quantifiers && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700, color: '#1e293b' }}>
                  Quantifier Preview
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: '#0f172a', 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  border: '1px solid #1e293b'
                }}>
                  <pre className="text-blue-400 text-xs leading-relaxed font-mono">
                    {Object.keys(quantifiers || {}).join("\n")}
                  </pre>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Send size={18} />}
              onClick={() => setConfirming(true)}
              disabled={!quantifiers || publishing}
              sx={{ 
                mt: 2, 
                py: 2, 
                borderRadius: 3, 
                bgcolor: '#2563eb', 
                fontWeight: 800,
                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                '&:hover': { bgcolor: '#1d4ed8' }
              }}
            >
              {publishing ? "Publishing..." : "Publish & Activate Form"}
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Modern Confirmation Dialog */}
      <Dialog 
        open={confirming} 
        onClose={() => setConfirming(false)}
        PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 400 } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#1e293b' }}>Confirm Publication</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Once published, this form will be live. You will <b>not be able to edit</b> the requirements or quantifiers anymore.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setConfirming(false)} sx={{ color: '#64748b', fontWeight: 600 }}>
            Keep Editing
          </Button>
          <Button 
            onClick={publishForm} 
            variant="contained" 
            sx={{ bgcolor: '#2563eb', fontWeight: 700, borderRadius: 2 }}
          >
            Yes, Publish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}