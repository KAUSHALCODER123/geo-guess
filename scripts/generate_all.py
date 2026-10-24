# -*- coding: utf-8 -*-
"""
FlagForge Project Documentation Generator
Produces docs/FlagForge_Project_Report.html and docs/FlagForge_Project_Report.md
"""
import sys
import subprocess
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
DOCS = WORKSPACE / "docs"
DOCS.mkdir(parents=True, exist_ok=True)

HTML_FILE = DOCS / "FlagForge_Project_Report.html"
MD_FILE = DOCS / "FlagForge_Project_Report.md"
PDF_FILE = DOCS / "FlagForge_Project_Report.pdf"

from report_data import (
    COLLEGE_NAME, COLLEGE_AFFILIATION, COLLEGE_ADDRESS, DEPARTMENT, DEGREE,
    ACADEMIC_YEAR, CANDIDATE_NAME, PROJECT_TITLE, PROJECT_ACRONYM, COORDINATOR_NAME,
    SVG_SEAL, SVG_FIG1_PROCESS, SVG_FIG2_WORKFLOW, SVG_FIG3_1_DFD0, SVG_FIG3_2_DFD1,
    SVG_FIG4_1_USECASE, SVG_FIG4_2_CLASS, SVG_FIG4_3_ACTIVITY, SVG_FIG4_4_SEQUENCE,
    SVG_FIG4_5_STORAGE, SVG_FIG5_GANTT, SVG_FIG6_SYSTEM_ARCH
)

print("Starting generation...")

HTML_HEADER = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{PROJECT_TITLE} ({PROJECT_ACRONYM}) - Project Report</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 20mm 18mm 20mm 18mm;
    @top-center {{
      content: "{PROJECT_ACRONYM} — {PROJECT_TITLE}";
      font-size: 8pt;
      color: #64748b;
      font-family: 'Times New Roman', serif;
    }}
    @bottom-center {{
      content: counter(page);
      font-size: 9pt;
      font-family: 'Times New Roman', serif;
    }}
  }}
  body {{
    font-family: 'Times New Roman', Times, Georgia, serif;
    font-size: 11pt;
    line-height: 1.45;
    color: #111827;
    margin: 0;
    padding: 0;
  }}
  .page {{
    page-break-after: always;
    box-sizing: border-box;
    min-height: 250mm;
  }}
  .cover-page {{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    height: 255mm;
    border: 2.5px double #1e3a8a;
    padding: 30px 20px;
    box-sizing: border-box;
  }}
  .cert-page {{
    border: 2px solid #334155;
    padding: 35px 25px;
    height: 255mm;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}
  h1.main-title {{
    font-size: 21pt;
    font-weight: bold;
    color: #0f172a;
    margin: 0 0 8px 0;
    line-height: 1.25;
  }}
  h2.sub-title {{
    font-size: 19pt;
    font-weight: bold;
    color: #1e3a8a;
    margin: 0 0 15px 0;
  }}
  .report-label {{
    font-size: 13pt;
    font-style: italic;
    font-weight: 600;
    margin-bottom: 5px;
  }}
  .degree-label {{
    font-size: 10.5pt;
    font-style: italic;
    max-width: 520px;
    margin: 0 auto 10px auto;
  }}
  .degree-name {{
    font-size: 12pt;
    font-weight: bold;
    letter-spacing: 0.5px;
    margin-bottom: 25px;
  }}
  .author-sec {{
    margin-bottom: 20px;
  }}
  .author-name {{
    font-size: 16pt;
    font-weight: bold;
    color: #0f172a;
  }}
  .college-footer {{
    margin-top: 15px;
  }}
  .dept-title {{
    font-size: 11pt;
    font-weight: bold;
    letter-spacing: 0.5px;
  }}
  .college-title {{
    font-size: 12pt;
    font-weight: bold;
    color: #1e3a8a;
    margin: 3px 0;
  }}
  .college-sub {{
    font-size: 9pt;
    font-style: italic;
  }}
  .college-loc {{
    font-size: 9.5pt;
    font-weight: 600;
    margin-top: 2px;
  }}
  .academic-year {{
    font-size: 11pt;
    font-weight: bold;
    margin-top: 4px;
  }}
  
  /* Standard Content Headings */
  h1.chp-head {{
    font-size: 15pt;
    font-weight: bold;
    color: #0f172a;
    border-bottom: 1.5px solid #1e3a8a;
    padding-bottom: 4px;
    margin-top: 0;
    margin-bottom: 12px;
  }}
  h2.sec-head {{
    font-size: 12.5pt;
    font-weight: bold;
    color: #1e3a8a;
    margin-top: 14px;
    margin-bottom: 6px;
  }}
  h3.subsec-head {{
    font-size: 11pt;
    font-weight: bold;
    color: #334155;
    margin-top: 10px;
    margin-bottom: 4px;
  }}
  p {{
    margin: 6px 0;
    text-align: justify;
    text-justify: inter-word;
  }}
  ul, ol {{
    margin: 5px 0 8px 22px;
    padding: 0;
  }}
  li {{
    margin-bottom: 4px;
  }}
  
  /* Tables */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
    font-size: 9pt;
  }}
  th, td {{
    border: 1px solid #475569;
    padding: 5px 7px;
    vertical-align: top;
  }}
  th {{
    background-color: #f1f5f9;
    font-weight: bold;
    text-align: left;
    color: #0f172a;
  }}
  
  /* Figures and Diagrams */
  .fig-wrap {{
    text-align: center;
    margin: 12px 0 10px 0;
    page-break-inside: avoid;
  }}
  .fig-cap {{
    font-size: 9pt;
    font-style: italic;
    color: #334155;
    margin-top: 4px;
  }}
  
  /* Code Blocks */
  pre {{
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-left: 3px solid #2563eb;
    padding: 7px 9px;
    font-family: Consolas, Monaco, 'Courier New', monospace;
    font-size: 7.5pt;
    line-height: 1.35;
    overflow-x: auto;
    margin: 8px 0;
    page-break-inside: avoid;
  }}
  
  .sig-grid {{
    display: flex;
    justify-content: space-between;
    margin-top: 45px;
    padding: 0 10px;
  }}
  .sig-block {{
    text-align: center;
    font-weight: bold;
    font-size: 10.5pt;
  }}
</style>
</head>
<body>
"""

print("Writing Content Pages...")
