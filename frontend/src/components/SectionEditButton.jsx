import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/use-content";
import { useToast } from "@/hooks/use-toast";

/**
 * Admin-only edit control for a CMS content section. Renders a small pencil
 * button; opens a JSON editor dialog on click. Saves via PUT /api/content/{section}.
 * A raw-JSON editor is used deliberately: it gives the admin full CMS control
 * (edit, add, or delete any card/field within the section) without needing a
 * bespoke form per content type.
 */
export default function SectionEditButton({ section, label }) {
  const { content, updateSection } = useContent();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleOpen = () => {
    setDraft(JSON.stringify(content[section], null, 2));
    setError("");
    setOpen(true);
  };

  const handleSave = async () => {
    let parsed;
    try {
      parsed = JSON.parse(draft);
    } catch {
      setError("Invalid JSON — please check syntax (missing comma, quote, or bracket).");
      return;
    }
    setSaving(true);
    try {
      await updateSection(section, parsed);
      toast({ title: "Saved", description: `${label} updated successfully.` });
      setOpen(false);
    } catch (e) {
      toast({ title: "Save failed", description: e.response?.data?.detail || "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        data-testid={`edit-section-${section}-button`}
        aria-label={`Edit ${label}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
      >
        <Pencil className="h-3 w-3" /> Edit
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl" data-testid={`edit-section-${section}-dialog`}>
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
            <DialogDescription>
              Full CMS control: edit fields, add new cards (add a new JSON object to an array), or delete cards
              (remove an object) directly in this structured editor.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="font-mono text-xs min-h-[380px]"
            data-testid={`edit-section-${section}-textarea`}
          />
          {error && (
            <p className="text-sm text-destructive mt-2" data-testid={`edit-section-${section}-error`}>
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} data-testid={`edit-section-${section}-cancel-button`}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} data-testid={`edit-section-${section}-save-button`}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
