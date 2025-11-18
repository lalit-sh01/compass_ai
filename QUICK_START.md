# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install & Run
```bash
npm install
npm run dev
```

### 2. Open Browser
Visit: **http://localhost:3000**

### 3. Load Roadmap
Click: **"Load example roadmap (final_roadmap.json)"**

That's it! You're now viewing a complete 14-week AI PM roadmap.

---

## 📖 What You'll See

### Home Page (`/`)
- Drag & drop zone for JSON files
- URL input for remote files
- Quick load button for example

### Roadmap Overview (`/viewer`)
- Overall progress bar
- Roadmap stats (dates, duration, commitment)
- Profile and learning style
- Core skills grid
- All phases as cards

### Phase View (`/viewer/phase/1`)
- Phase summary and progress
- All weeks in the phase
- Week cards with time breakdown
- Navigation to other phases

### Week View (`/viewer/week/1`)
- Complete week details
- Build section (project, tech stack, deliverables)
- Research section (topics, resources, subtasks)
- Share section (artifacts, tags)
- Progress tracking
- Previous/Next week navigation

---

## 🎯 Key Features

### Upload Your Own Roadmap
1. Create a JSON file matching the schema
2. Drag & drop it on the home page
3. Get instant validation feedback
4. Fix any errors shown
5. Explore your roadmap!

### Navigate
- Click phase cards to see all weeks
- Click week cards to see details
- Use Previous/Next buttons
- Click "Back to overview" anytime

### Track Progress
- See completion percentage everywhere
- Green = 75%+, Blue = 50-74%, Yellow = 25-49%, Gray = 0-24%
- Check/uncheck deliverables (visual only, not saved)

### Explore Resources
- Click resource links to open in new tab
- See type badges (YouTube, Article, Guide, etc.)
- Resources available at all levels (topics, subtasks)

---

## 📂 Important Files

### For Users
- `/public/final_roadmap.json` - Example roadmap
- `/public/json_schema_final.json` - Schema for validation
- `README.md` - Full documentation
- `FINAL_SUMMARY.md` - Complete feature list

### For Developers
- `lib/types.ts` - TypeScript interfaces
- `lib/validator.ts` - Schema validation
- `lib/roadmap-utils.ts` - Utility functions
- `IMPLEMENTATION_PLAN.md` - Technical docs

---

## 🔧 Common Tasks

### Test Your JSON
```bash
# Create a test file
# test.js
const Ajv = require('ajv');
const fs = require('fs');

const schema = JSON.parse(fs.readFileSync('./public/json_schema_final.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('./your-roadmap.json', 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

if (validate(data)) {
  console.log('✅ Valid!');
} else {
  console.log('❌ Errors:', validate.errors);
}

# Run it
node test.js
```

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## ❓ Troubleshooting

### Validation Errors?
1. Check the error message shown in the UI
2. Compare your JSON with `final_roadmap.json`
3. Ensure all required fields are present
4. Check field types (string, number, boolean, array)

### Page Not Loading?
1. Make sure dev server is running
2. Check browser console for errors
3. Try clearing browser cache
4. Restart the dev server

### Build Errors?
```bash
# Clean install
rm -rf node_modules .next package-lock.json
npm install
npm run build
```

---

## 🎨 Customization

### Change Colors
Edit `app/globals.css` for Tailwind color scheme

### Add Pages
Create new files in `app/viewer/[your-route]/page.tsx`

### Modify Components
All components in `components/` directory

### Update Schema
Edit `public/json_schema_final.json` and update TypeScript types

---

## 📱 Mobile Support

The app is fully responsive:
- **Desktop**: Full layout with all features
- **Tablet**: Optimized grid layouts
- **Mobile**: Stacked cards, touch-friendly

---

## 🌙 Dark Mode

Automatic dark mode support:
- Follows system preference
- All components styled for both modes
- Clean contrast in both themes

---

## 🎯 Next Steps

1. **Explore the example**: Load `final_roadmap.json` and click through all 14 weeks
2. **Read the docs**: Check `README.md` and `IMPLEMENTATION_PLAN.md`
3. **Create your own**: Use the schema to build your roadmap
4. **Share**: Export and share your roadmap JSON with others

---

## 💡 Tips

- Use the "Back to overview" link to navigate quickly
- Check progress bars to see completion status
- Click resource links to open documentation
- Explore all sections (Build, Research, Share)
- Try both light and dark modes

---

**Need Help?**
- Read `README.md` for full documentation
- Check `GAPS_FIXED.md` for known issues
- See `SCHEMA_FIXES.md` for validation details

**Ready to Build?**
Start with `final_roadmap.json` as a template and customize! 🚀
