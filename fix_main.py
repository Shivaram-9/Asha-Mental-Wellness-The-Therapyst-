import re

with open("src/main.js", "r", encoding="utf-8") as f:
    js = f.read()

pattern = r"for \(let i = 1; i <= 5; i\+\+.*?// Initialize Review System on load"

replacement = """for (let i = 1; i <= 5; i++) {
                const count = counts[i] || 0;
                
                const countEl = document.getElementById('ratingCount' + i);
                if (countEl) countEl.textContent = count;
                
                const pct = (count / reviews.length) * 100;
                const barEl = document.getElementById('ratingBar' + i);
                if (barEl) barEl.style.width = pct + '%';
            }
        } else {
            const avgRatingEl = document.getElementById('averageRating');
            if (avgRatingEl) avgRatingEl.textContent = '0.0';
            
            const avgStarsEl = document.getElementById('averageStars');
            if (avgStarsEl) avgStarsEl.innerHTML = '&#9734;&#9734;&#9734;&#9734;&#9734;';
            
            const reviewCountEl = document.getElementById('reviewCount');
            if (reviewCountEl) reviewCountEl.textContent = '0';
            
            for (let i = 1; i <= 5; i++) {
                const countEl = document.getElementById('ratingCount' + i);
                if (countEl) countEl.textContent = '0';
                
                const barEl = document.getElementById('ratingBar' + i);
                if (barEl) barEl.style.width = '0%';
            }
        }
    } catch (error) {
        console.error('Error fetching ratings:', error);
    }
}

// Initialize Review System on load"""

js = re.sub(pattern, replacement, js, flags=re.DOTALL)

with open("src/main.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Fixed main.js syntax")
