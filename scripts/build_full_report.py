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

from report_data import (
    COLLEGE_NAME, COLLEGE_AFFILIATION, COLLEGE_ADDRESS, DEPARTMENT, DEGREE,
    ACADEMIC_YEAR, CANDIDATE_NAME, PROJECT_TITLE, PROJECT_ACRONYM, COORDINATOR_NAME,
    SVG_SEAL, SVG_FIG1_PROCESS, SVG_FIG2_WORKFLOW, SVG_FIG3_1_DFD0, SVG_FIG3_2_DFD1,
    SVG_FIG4_1_USECASE, SVG_FIG4_2_CLASS, SVG_FIG6_SYSTEM_ARCH
)

print("Building FlagForge Comprehensive Project Report...")
