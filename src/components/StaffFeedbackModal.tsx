import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RiskAlert } from "./RiskAlertsPanel";

interface StaffFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  alert: RiskAlert | null;
}

const StaffFeedbackModal = ({ open, onClose, alert }: StaffFeedbackModalProps) => {
  const [verdict, setVerdict] = useState<"accurate" | "inaccurate" | null>(null);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVerdict(null);
      setNotes("");
      onClose();
    }, 1500);
  };

  const reset = () => {
    setVerdict(null);
    setNotes("");
    setSubmitted(false);
  };

  if (!alert) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle size={18} className="text-primary" />
            Staff Feedback — Ground Truth
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Was the AI risk prediction accurate for <span className="font-semibold text-foreground">{alert.jobName}</span>?
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle size={48} className="mx-auto text-risk-low mb-3" />
            <p className="text-foreground font-semibold">Feedback Submitted!</p>
            <p className="text-sm text-muted-foreground">This data will improve future predictions.</p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground mb-1">AI Prediction</p>
              <p className="text-sm font-medium text-foreground">{alert.message}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-foreground mb-2">Was this prediction accurate?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setVerdict("accurate")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition-all",
                    verdict === "accurate"
                      ? "border-risk-low bg-risk-low/10 text-risk-low"
                      : "border-border text-muted-foreground hover:border-risk-low/50"
                  )}
                >
                  <CheckCircle size={18} /> Yes, Accurate
                </button>
                <button
                  onClick={() => setVerdict("inaccurate")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 text-sm font-medium transition-all",
                    verdict === "inaccurate"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  <XCircle size={18} /> No, Inaccurate
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Additional Notes (optional)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="E.g., Machine was fixed earlier than expected..."
                className="mt-1 bg-muted border-border"
                rows={3}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!verdict}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StaffFeedbackModal;
