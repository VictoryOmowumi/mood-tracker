// app/journal/components/ExportButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { JournalList } from "./JournalList";
export function ExportButton({ entries }: { entries}) {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current || entries === 0) return;

    try {
      const dataUrl = await toPng(exportRef.current);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("mood-journal.pdf");
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <>
      <Button onClick={handleExport} disabled={entries === 0}>
        <Download className="mr-2 h-4 w-4" />
        Export PDF
      </Button>
      <div className="hidden">
        <div ref={exportRef} className="p-4 bg-white">
          {/* Hidden content for PDF */}
          <h1 className="text-2xl font-bold mb-4">Mood Journal</h1>
          <JournalList entries={entries} forExport />
        </div>
      </div>
    </>
  );
}