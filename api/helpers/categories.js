// Hardcoded categories helper
export const getCategories = () => {
    return [
  // 🔹 Technology & Development
  { _id: "1", name: "Technology", slug: "technology" },
  { _id: "2", name: "Programming", slug: "programming" },
  { _id: "3", name: "Web Development", slug: "web-development" },
  { _id: "4", name: "Mobile Development", slug: "mobile-development" },
  { _id: "5", name: "Data Science", slug: "data-science" },
  { _id: "6", name: "DevOps", slug: "devops" },
  { _id: "7", name: "AI & Machine Learning", slug: "ai-machine-learning" },
  { _id: "8", name: "Cybersecurity", slug: "cybersecurity" },
  { _id: "9", name: "Cloud Computing", slug: "cloud-computing" },
  { _id: "10", name: "Software Engineering", slug: "software-engineering" },

  // 🔹 Design & UI/UX
  { _id: "11", name: "UI/UX Design", slug: "ui-ux-design" },
  { _id: "12", name: "Graphic Design", slug: "graphic-design" },
  { _id: "13", name: "Product Design", slug: "product-design" },

  // 🔹 Business & Startups
  { _id: "14", name: "Entrepreneurship", slug: "entrepreneurship" },
  { _id: "15", name: "Startups", slug: "startups" },
  { _id: "16", name: "Marketing", slug: "marketing" },
  { _id: "17", name: "Finance", slug: "finance" },
  { _id: "18", name: "E-Commerce", slug: "e-commerce" },
  { _id: "19", name: "Product Management", slug: "product-management" },

  // 🔹 Science & Education
  { _id: "20", name: "Science", slug: "science" },
  { _id: "21", name: "Space & Astronomy", slug: "space-astronomy" },
  { _id: "22", name: "Mathematics", slug: "mathematics" },
  { _id: "23", name: "Education", slug: "education" },
  { _id: "24", name: "Research", slug: "research" },

  // 🔹 Lifestyle & Health
  { _id: "25", name: "Health & Fitness", slug: "health-fitness" },
  { _id: "26", name: "Food & Nutrition", slug: "food-nutrition" },
  { _id: "27", name: "Travel", slug: "travel" },
  { _id: "28", name: "Personal Development", slug: "personal-development" },
  { _id: "29", name: "Mindfulness & Mental Health", slug: "mindfulness-mental-health" },

  // 🔹 Entertainment & Media
  { _id: "30", name: "Gaming", slug: "gaming" },
  { _id: "31", name: "Movies & TV", slug: "movies-tv" },
  { _id: "32", name: "Music", slug: "music" },
  { _id: "33", name: "Books & Literature", slug: "books-literature" },
  { _id: "34", name: "Photography", slug: "photography" },

  // 🔹 Social & Culture
  { _id: "35", name: "Society & Culture", slug: "society-culture" },
  { _id: "36", name: "Politics", slug: "politics" },
  { _id: "37", name: "History", slug: "history" },
  { _id: "38", name: "Philosophy", slug: "philosophy" },
  { _id: "39", name: "Environment", slug: "environment" },

  // 🔹 Career & Productivity
  { _id: "40", name: "Career Advice", slug: "career-advice" },
  { _id: "41", name: "Freelancing", slug: "freelancing" },
  { _id: "42", name: "Remote Work", slug: "remote-work" },
  { _id: "43", name: "Productivity", slug: "productivity" },

  // 🔹 Miscellaneous
  { _id: "44", name: "Open Source", slug: "open-source" },
  { _id: "45", name: "Technology Trends", slug: "technology-trends" },
  { _id: "46", name: "Tutorials", slug: "tutorials" },
  { _id: "47", name: "Reviews", slug: "reviews" },
  { _id: "48", name: "Opinion", slug: "opinion" },
  { _id: "49", name: "News & Updates", slug: "news-updates" },
  { _id: "50", name: "How-To Guides", slug: "how-to-guides" }
]

}

export const getCategoryById = (id) => {
    const categories = getCategories()
    return categories.find(cat => cat._id === id) || { _id: id, name: "Unknown", slug: "unknown" }
}

export const getCategoryBySlug = (slug) => {
    const categories = getCategories()
    return categories.find(cat => cat.slug === slug)
}