**Act as:** An Expert Front-End Developer & UI Designer.
**Task:** Create a responsive, single-file HTML landing page for "Na Haeo Botanics".
**Tech Stack:** HTML5, Tailwind CSS (via CDN), Google Fonts (Inter & Kanit), FontAwesome (via CDN).

* **Design Concept:**
  Modern Thai OTOP meets AR Technology. The aesthetic is "Clean, Pastel, Glassmorphism".

**Colors:** Soft Pink (#FFD1DC), Creamy Peach (#FFE5B4), Mint Green (#98FF98), Off-white Background (#F9FAFB).

**Visual Style:** Heavy use of `backdrop-blur`, translucent white backgrounds, soft colored shadows, and rounded corners.

**Instructions:**

1. **Setup:** Include Tailwind CSS CDN and Google Fonts (Import 'Kanit' for Thai text and 'Inter' for English).
2. **Structure:**
   * **Navbar:** Sticky, glassmorphism effect, logo left, "Explore AR" button right.
   * **Hero Section:** Split layout (Desktop).
     * *Left:* H1 Headline "Tap to Bloom: สัมผัสศรัทธานาแห้วในมิติใหม่", Subtext, and a Gradient CTA Button with a glow effect.
     * *Right:* A visual composition representing floating product boxes and a smartphone showing a hologram flower (Use a placeholder image from Unsplash with a floating animation CSS class).
   * **How it Works (Glass Cards):** 3 Steps (Tap, Scan, Bloom). Use FontAwesome icons inside frosted glass circles.
   * **3D Landmark Showcase:** A section with a large "Model Viewer" container (gray/glass styled) showing "Wat Si Pho Chai". Add clickable thumbnail buttons below it.
   * **Story & Products:** A section mixing a cultural photo (left) and 3 product cards (right). Product cards must look like frosted glass with "View 3D" buttons.
3. **Specific Tailwind Classes to use:**
   * Use `bg-white/30` or `bg-white/50` combined with `backdrop-blur-md` for the glass effect.
   * Use `shadow-xl` and custom colored shadows if possible.
   * Make it fully responsive (stack columns on mobile).

**Content Implementation:**

* Use standard placeholder images (e.g., from unsplash source) where images are required, but add `alt` text describing what should be there (e.g., "Bamboo Flower Tower", "Pink Lip Balm").
* Ensure typography is clean: Use 'Kanit' for Headings and 'Inter' for body text.

**Output:**
Provide the complete, runnable `index.html` code. No separate CSS files; use Tailwind utility classes for everything. Add custom CSS in a `<style>` tag only for custom animations (like floating).
