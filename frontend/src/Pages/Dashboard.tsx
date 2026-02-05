import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";
import Navbar from "../components/Navbar"; // Import the new Navbar

type FormStatus = "active" | "inactive" | "expired";

type Form = {
  uuid: string;
  title: string;
  description: string;
  status: FormStatus;
  filledCount: number;
};

const STATUS_CONFIG: Record<
  FormStatus,
  { label: string; color: "primary" | "warning" | "error" | "default"; chipBg: string }
> = {
  active: { label: "Active Forms", color: "primary", chipBg: "#eff6ff" },
  inactive: { label: "Inactive Forms", color: "warning", chipBg: "#fffbeb" },
  expired: { label: "Expired Forms", color: "error", chipBg: "#fef2f2" },
};

export default function Dashboard() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch("/user/forms")
      .then((res) => res.json())
      .then((data) => {
        setForms(data.forms || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8faff" }}>
        <Navbar />
        <Box sx={{ height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress sx={{ color: "#2563eb" }} />
        </Box>
      </Box>
    );
  }

  const grouped: Record<FormStatus, Form[]> = {
    active: forms.filter((f) => f.status === "active"),
    inactive: forms.filter((f) => f.status === "inactive"),
    expired: forms.filter((f) => f.status === "expired"),
  };

  const handleCardClick = (form: Form): void => {
    const path = form.status === "inactive" ? `/form/edit/${form.uuid}` : `/form/view/${form.uuid}`;
    navigate(path);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8faff" }}> {/* Light Blue Background */}
      <Navbar />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#1e293b", mb: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: "#64748b" }}>
            Manage and monitor your current form performance.
          </Typography>
        </Box>

        {(Object.keys(grouped) as FormStatus[]).map((status) => {
          const sectionForms = grouped[status];
          if (sectionForms.length === 0) return null;

          const config = STATUS_CONFIG[status];

          return (
            <Box key={status} sx={{ mb: 6 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ mb: 2.5, fontWeight: 700, color: "#475569", display: 'flex', alignItems: 'center', gap: 1 }}
              >
                {config.label}
                <Chip label={sectionForms.length} size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }} />
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)"
                }, gap: 3 }}>
                {sectionForms.map((form) => (
                  <Card
                    key={form.uuid}
                    elevation={0}
                    onClick={() => handleCardClick(form)}
                    sx={{
                      borderRadius: "16px",
                      border: "1px solid",
                      borderColor: "#e2e8f0",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: "#2563eb",
                        transform: "translateY(-4px)",
                        boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Chip
                          size="small"
                          label={form.status.toUpperCase()}
                          color={config.color}
                          sx={{ fontWeight: 700, fontSize: "0.65rem", borderRadius: "6px" }}
                        />
                        <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                          {form.filledCount} Submissions
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1e293b" }}>
                        {form.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.6
                        }}
                      >
                        {form.description}
                      </Typography>
                      
                      <Box sx={{ pt: 2, borderTop: "1px dashed #e2e8f0", color: "#2563eb", fontWeight: 600, fontSize: "0.8rem" }}>
                        View Details →
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}