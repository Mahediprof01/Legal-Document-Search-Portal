from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="Legal Document Search API")

# Allow requests from our frontend during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

class LegalDocument(BaseModel):
    id: int
    title: str
    summary: str
    relevance_score: float
    document_type: str
    date_filed: str

class SearchResponse(BaseModel):
    query: str
    total_results: int
    documents: List[LegalDocument]

# Mock database - in production this would connect to a real legal database
MOCK_LEGAL_DOCS = [
    {
        "id": 1,
        "title": "Smith v. Johnson Commercial Lease Dispute",
        "summary": "This case involves a commercial lease agreement dispute between Smith Properties LLC and Johnson Enterprises. The plaintiff alleges breach of contract regarding maintenance obligations and rent escalation clauses. The court found in favor of the plaintiff, establishing precedent for landlord responsibilities in commercial properties. Key findings include requirements for written notice of lease modifications and specific timelines for repair obligations.",
        "relevance_score": 0.95,
        "document_type": "Case Law",
        "date_filed": "2023-08-15"
    },
    {
        "id": 2,
        "title": "Employment Agreement Template - Executive Level",
        "summary": "Comprehensive employment contract template for executive-level positions. Includes standard provisions for compensation, benefits, equity grants, non-compete clauses, confidentiality obligations, and termination conditions. This template has been reviewed for compliance with current labor laws and includes optional clauses for intellectual property assignment, arbitration agreements, and severance packages. Suitable for C-suite and senior management positions.",
        "relevance_score": 0.88,
        "document_type": "Contract Template",
        "date_filed": "2025-01-20"
    },
    {
        "id": 3,
        "title": "Intellectual Property Rights in Software Development",
        "summary": "Detailed analysis of intellectual property ownership in software development projects. Covers copyright, patent, and trade secret protections. Discusses work-for-hire doctrine, contractor agreements, and open-source licensing implications. Includes case studies from landmark decisions and practical guidance for startups and established companies. Addresses employee vs. contractor distinctions and recommended best practices for IP assignment agreements.",
        "relevance_score": 0.82,
        "document_type": "Legal Analysis",
        "date_filed": "2023-11-30"
    },
    {
        "id": 4,
        "title": "Corporate Merger and Acquisition Due Diligence Checklist",
        "summary": "Comprehensive checklist for M&A due diligence processes. Covers financial audits, legal compliance reviews, intellectual property assessments, employment matters, and regulatory requirements. Includes sections on environmental liabilities, pending litigation review, and contract assignment provisions. Provides timeline recommendations and documentation requirements for successful transaction completion.",
        "relevance_score": 0.79,
        "document_type": "Legal Guide",
        "date_filed": "2022-02-10"
    },
    {
        "id": 5,
        "title": "Data Privacy Compliance - GDPR and CCPA Overview",
        "summary": "Detailed overview of data privacy regulations including General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA). Explains compliance requirements, user consent mechanisms, data breach notification obligations, and penalties for non-compliance. Includes practical implementation guides for businesses, data processing agreements templates, and privacy policy requirements. Updated to reflect recent enforcement actions and regulatory guidance.",
        "relevance_score": 0.91,
        "document_type": "Regulatory Guide",
        "date_filed": "2024-03-05"
    },
    {
        "id": 6,
        "title": "Non-Disclosure Agreement (NDA) - Mutual Protection",
        "summary": "Standard mutual non-disclosure agreement template suitable for business negotiations, partnership discussions, and vendor relationships. Includes definitions of confidential information, permitted uses, exclusions from confidentiality, term and termination provisions, and remedies for breach. Contains optional provisions for residual information, standard of care, and return of materials clauses.",
        "relevance_score": 0.85,
        "document_type": "Contract Template",
        "date_filed": "2023-09-18"
    }
]

def search_documents(query: str) -> List[LegalDocument]:
    """Search through our mock database and return matching docs."""
    search_term = query.lower()
    matches = []
    
    for document in MOCK_LEGAL_DOCS:
        title_match = search_term in document["title"].lower()
        summary_match = search_term in document["summary"].lower()
        
        # Also check individual words from the query
        word_matches = any(
            word in document["title"].lower() or word in document["summary"].lower()
            for word in search_term.split()
        )
        
        if title_match or summary_match or word_matches:
            matches.append(document)
    
    # Sort by relevance and return top 3
    matches.sort(key=lambda doc: doc["relevance_score"], reverse=True)
    return matches[:3]

@app.get("/")
def root():
    return {
        "service": "Legal Document Search API",
        "status": "operational",
        "version": "1.0.0"
    }

@app.post("/generate", response_model=SearchResponse)
async def generate_search_results(request: QueryRequest):
    """Main endpoint for searching legal documents."""
    query_text = request.query.strip()
    
    # Basic validation
    if not query_text:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    if len(query_text) > 500:
        raise HTTPException(
            status_code=400, 
            detail="Query too long. Maximum 500 characters."
        )
    
    # Get matching documents
    found_docs = search_documents(query_text)
    
    # If nothing matches, just return the top 3 highest-rated docs
    if not found_docs:
        found_docs = sorted(
            MOCK_LEGAL_DOCS, 
            key=lambda d: d["relevance_score"], 
            reverse=True
        )[:3]
    
    return SearchResponse(
        query=query_text,
        total_results=len(found_docs),
        documents=[LegalDocument(**doc) for doc in found_docs]
    )

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
