# -*- coding: utf-8 -*-
"""
Compile all parts into HTML, Markdown, and PDF
"""

import os
import subprocess
import sys
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
SCRIPTS = WORKSPACE / "scripts"
DOCS = WORKSPACE / "docs"
DOCS.mkdir(parents=True, exist_ok=True)

sys.path.insert(0, str(SCRIPTS))

from report_data import *
from report_part1 import *
from report_part2 import *
from report_part3 import *
from report_part4 import *
from report_part5 import *

HTML_PATH = DOCS / "FlagForge_Project_Report.html"
MD_PATH = DOCS / "FlagForge_Project_Report.md"
PDF_PATH = DOCS / "FlagForge_Project_Report.pdf"

print("Compiling full HTML report...")

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FlagForge - Project Report</title>
<style>
  @page {{
    size: A4 portrait;
    margin: 18mm 16mm 18mm 16mm;
    @top-center {{
      content: "FlagForge — Geography & Culture Learning Platform";
      font-size: 8.5pt;
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
    position: relative;
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
{PAGE_COVER}
{PAGE_CERT1}
{PAGE_CERT2}
{PAGE_DECLARATION}
{PAGE_ACKNOWLEDGEMENT}
{PAGE_ABSTRACT}
{PAGE_FIGURES}
{PAGE_INDEX}
{CHP1_OVERVIEW}
{CHP2_INTRO}
{CHP2_SECTIONS}
{CHP2_PROBLEM}
{CHP2_NEED}
{CHP3_LIT}
{CHP4_ANALYSIS}
{CHP4_PROCESS_FLOW}
{CHP4_WORKFLOW}
{CHP4_FEASIBILITY}
{CHP4_COST}
{CHP4_DFD}
{CHP4_DFD1}
{CHP4_UML_INTRO}
{CHP4_USECASE}
{CHP4_CLASS}
{CHP4_ACTIVITY}
{CHP4_SEQUENCE}
{CHP4_STORAGE}
{CHP4_COMPONENT}
{CHP4_GANTT}
{CHP4_TECH_ARCH}
{CHP4_SYSTEM_ARCH}
{CHP5_INTRO}
{CHP5_CODE_1}
{CHP5_CODE_2}
{CHP5_CODE_3}
{CHP5_CODE_4}
{CHP5_GUI_1}
{CHP5_GUI_2}
{CHP5_TESTS}
{CHP6_CONCLUSION}
{CHP6_FUTURE}
{CHP7_REFERENCES}
{CHP8_SYNOPSIS}
</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated HTML report: {HTML_PATH}")

# Generate Markdown Report
print("Generating Markdown report...")
import re

def html_to_markdown_simple(html):
    # Keep header and structure
    text = re.sub(r'<style>[\s\S]*?</style>', '', html)
    text = re.sub(r'<script>[\s\S]*?</script>', '', text)
    text = re.sub(r'<!DOCTYPE html>|<html.*?>|</html>|<head>[\s\S]*?</head>|<body.*?>|</body>', '', text)
    text = re.sub(r'<div class="page.*?">', '\n---\n', text)
    text = re.sub(r'</div>', '', text)
    text = re.sub(r'<h1 class="main-title">([\s\S]*?)</h1>', r'# \1\n', text)
    text = re.sub(r'<h2 class="sub-title">([\s\S]*?)</h2>', r'## \1\n', text)
    text = re.sub(r'<h1 class="chp-head">([\s\S]*?)</h1>', r'# \1\n', text)
    text = re.sub(r'<h2 class="sec-head">([\s\S]*?)</h2>', r'## \1\n', text)
    text = re.sub(r'<h3 class="subsec-head">([\s\S]*?)</h3>', r'### \1\n', text)
    text = re.sub(r'<h2.*?>([\s\S]*?)</h2>', r'## \1\n', text)
    text = re.sub(r'<strong>(.*?)</strong>', r'**\1**', text)
    text = re.sub(r'<em>(.*?)</em>', r'*\1*', text)
    text = re.sub(r'<code>(.*?)</code>', r'`\1`', text)
    text = re.sub(r'<pre>([\s\S]*?)</pre>', r'```typescript\n\1\n```', text)
    text = re.sub(r'<svg[\s\S]*?</svg>', r'*(Embedded High-Resolution Architectural SVG Diagram)*', text)
    text = re.sub(r'<p>([\s\S]*?)</p>', r'\1\n\n', text)
    text = re.sub(r'<li>([\s\S]*?)</li>', r'- \1', text)
    text = re.sub(r'<ul>|</ul>|<ol>|</ol>', '', text)
    text = re.sub(r'<div class="fig-cap">([\s\S]*?)</div>', r'*\1*\n', text)
    text = re.sub(r'<div.*?>|</div>', '', text)
    text = re.sub(r'<span.*?>|</span>', '', text)
    text = re.sub(r'<a href="(.*?)".*?>(.*?)</a>', r'[\2](\1)', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&rarr;', '→', text)
    text = re.sub(r'&times;', '×', text)
    text = re.sub(r'&le;', '≤', text)
    text = re.sub(r'&ge;', '≥', text)
    text = re.sub(r'&ndash;', '–', text)
    return text.strip()

md_content = html_to_markdown_simple(html_content)

with open(MD_PATH, "w", encoding="utf-8") as f:
    f.write(md_content)

print(f"Generated Markdown report: {MD_PATH}")

# Compile PDF via Chrome headless
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if os.path.exists(chrome_path):
    print("Compiling PDF via Google Chrome Headless...")
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={PDF_PATH}",
        str(HTML_PATH)
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Successfully generated PDF report: {PDF_PATH}")
    else:
        print(f"Chrome PDF generation error: {res.stderr}")
else:
    print(f"Chrome not found at {chrome_path}")
