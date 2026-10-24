#!/usr/bin/env python3
"""
FlagForge Academic Project Report Generator
Creates:
  1. docs/FlagForge_Project_Report.md
  2. docs/FlagForge_Project_Report.html
  3. docs/FlagForge_Project_Report.pdf (using headless Chrome print-to-pdf)
Matches the exact structure, academic formatting, and page count of Bibliotheca_Project_Report-1.pdf
"""

import os
import sys
import subprocess
from pathlib import Path

WORKSPACE = Path(r"c:\Users\Kaushal Rajput\food-waste-system")
DOCS = WORKSPACE / "docs"
DOCS.mkdir(parents=True, exist_ok=True)

HTML_OUT = DOCS / "FlagForge_Project_Report.html"
MD_OUT = DOCS / "FlagForge_Project_Report.md"
PDF_OUT = DOCS / "FlagForge_Project_Report.pdf"

print("1. Preparing SVG diagrams and report content...")
