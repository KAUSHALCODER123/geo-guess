"""
FlagForge - Complete Academic Project Report Generator
Modeled directly after Bibliotheca_Project_Report-1.pdf
"""

import os
import subprocess
import sys
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

print("Starting generation of FlagForge Academic Project Documentation...")
