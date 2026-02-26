import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const CustomerFeedbackForm = () => {
  const [timelinessRating, setTimelinessRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div>
      <p className="text-sm font-medium text-foreground mb-1">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => onChange(star)} className="transition-transform hover:scale-110">
            <Star
              size={24}
              className={cn(
                "transition-colors",
                star <= value ? "fill-risk-medium text-risk-medium" : "text-border"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTimelinessRating(0);
      setQualityRating(0);
      setComment("");
    }, 3000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Customer Feedback</h3>
      <p className="text-xs text-muted-foreground mb-4">Rate your completed order experience</p>

      {submitted ? (
        <div className="py-6 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <p className="font-semibold text-foreground">Thank you for your feedback!</p>
          <p className="text-xs text-muted-foreground">Your input helps us improve.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <StarRating label="Timeliness" value={timelinessRating} onChange={setTimelinessRating} />
          <StarRating label="Print Quality" value={qualityRating} onChange={setQualityRating} />
          <div>
            <label className="text-sm font-medium text-foreground">Comments (optional)</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="mt-1 bg-muted border-border"
              rows={3}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!timelinessRating || !qualityRating}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Submit Rating
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerFeedbackForm;
