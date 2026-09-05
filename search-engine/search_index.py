from typing import List, Dict, Set
import re
from collections import defaultdict, Counter
import math
import logging

logger = logging.getLogger(__name__)

class SearchIndex:
    """Full-text search index"""
    
    def __init__(self):
        self.index: Dict[str, List[Dict]] = defaultdict(list)
        self.documents: Dict[str, Dict] = {}
        self.tf_idf_scores: Dict[str, Dict[str, float]] = {}
    
    def tokenize(self, text: str) -> List[str]:
        """Tokenize text into words"""
        # Convert to lowercase
        text = text.lower()
        # Remove special characters
        text = re.sub(r'[^a-z0-9\s]', '', text)
        # Split into words
        words = text.split()
        # Remove empty strings
        words = [w for w in words if w]
        return words
    
    def index_page(self, doc_id: str, title: str, content: str, url: str) -> None:
        """Index a page"""
        # Tokenize
        title_tokens = self.tokenize(title)
        content_tokens = self.tokenize(content)
        
        # Store document
        self.documents[doc_id] = {
            'url': url,
            'title': title,
            'content': content[:1000],
            'tokens': set(title_tokens + content_tokens)
        }
        
        # Index tokens
        all_tokens = title_tokens + content_tokens
        for token in set(all_tokens):
            count = all_tokens.count(token)
            # Give more weight to title matches
            if token in title_tokens:
                count += 5
            
            self.index[token].append({
                'doc_id': doc_id,
                'count': count
            })
    
    def calculate_tf_idf(self) -> None:
        """Calculate TF-IDF scores"""
        total_docs = len(self.documents)
        
        for token, docs in self.index.items():
            idf = math.log(total_docs / len(docs)) if docs else 0
            
            for doc in docs:
                doc_id = doc['doc_id']
                tf = doc['count'] / len(self.documents[doc_id]['tokens'])
                
                if doc_id not in self.tf_idf_scores:
                    self.tf_idf_scores[doc_id] = {}
                
                self.tf_idf_scores[doc_id][token] = tf * idf
    
    def search(self, query: str, top_k: int = 10) -> List[Dict]:
        """Search for documents"""
        query_tokens = self.tokenize(query)
        
        if not query_tokens:
            return []
        
        # Find matching documents
        matching_docs = set()
        for token in query_tokens:
            if token in self.index:
                for doc in self.index[token]:
                    matching_docs.add(doc['doc_id'])
        
        # Score documents
        scores = {}
        for doc_id in matching_docs:
            score = 0
            for token in query_tokens:
                if token in self.tf_idf_scores.get(doc_id, {}):
                    score += self.tf_idf_scores[doc_id][token]
            scores[doc_id] = score
        
        # Sort by score
        ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        
        # Format results
        results = []
        for doc_id, score in ranked[:top_k]:
            doc = self.documents[doc_id]
            results.append({
                'url': doc['url'],
                'title': doc['title'],
                'content': doc['content'],
                'score': score
            })
        
        return results
