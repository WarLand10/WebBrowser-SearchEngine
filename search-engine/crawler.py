import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

class WebCrawler:
    """Web crawler for indexing pages"""
    
    def __init__(self, max_depth: int = 3, timeout: int = 10):
        self.max_depth = max_depth
        self.timeout = timeout
        self.visited_urls = set()
        self.headers = {
            'User-Agent': 'WebBrowser-SearchEngine/1.0 (+http://webbrowser.local/bot)'
        }
    
    def fetch_page(self, url: str) -> Optional[str]:
        """Fetch page content"""
        try:
            response = requests.get(url, headers=self.headers, timeout=self.timeout)
            response.raise_for_status()
            return response.text
        except Exception as e:
            logger.error(f"Error fetching {url}: {e}")
            return None
    
    def parse_page(self, html: str, url: str) -> Dict:
        """Parse page HTML and extract data"""
        try:
            soup = BeautifulSoup(html, 'html.parser')
            
            # Extract title
            title = soup.title.string if soup.title else ''
            
            # Extract meta description
            meta_desc = soup.find('meta', {'name': 'description'})
            description = meta_desc.get('content', '') if meta_desc else ''
            
            # Extract text content
            for script in soup(["script", "style"]):
                script.decompose()
            text = soup.get_text()
            text = ' '.join(text.split())
            
            # Extract links
            links = []
            for link in soup.find_all('a', href=True):
                href = urljoin(url, link['href'])
                links.append(href)
            
            return {
                'url': url,
                'title': title.strip() if title else '',
                'description': description.strip(),
                'content': text[:5000],  # Limit content size
                'links': list(set(links)),  # Remove duplicates
                'words': len(text.split())
            }
        except Exception as e:
            logger.error(f"Error parsing {url}: {e}")
            return None
    
    def extract_links(self, html: str, base_url: str) -> List[str]:
        """Extract all links from HTML"""
        try:
            soup = BeautifulSoup(html, 'html.parser')
            links = []
            
            for link in soup.find_all('a', href=True):
                url = urljoin(base_url, link['href'])
                # Filter only http/https
                if url.startswith(('http://', 'https://')):
                    links.append(url)
            
            return list(set(links))
        except Exception as e:
            logger.error(f"Error extracting links from {base_url}: {e}")
            return []
    
    def crawl(self, start_url: str, depth: int = 0) -> List[Dict]:
        """Crawl website starting from URL"""
        if depth > self.max_depth or start_url in self.visited_urls:
            return []
        
        self.visited_urls.add(start_url)
        pages = []
        
        html = self.fetch_page(start_url)
        if not html:
            return pages
        
        page_data = self.parse_page(html, start_url)
        if page_data:
            pages.append(page_data)
        
        # Recursively crawl links
        if depth < self.max_depth:
            links = self.extract_links(html, start_url)
            for link in links[:5]:  # Limit links per page
                pages.extend(self.crawl(link, depth + 1))
        
        return pages
