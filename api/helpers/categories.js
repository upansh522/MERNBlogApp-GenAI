// Hardcoded categories helper
export const getCategories = () => {
    return [
        { _id: "1", name: "Technology", slug: "technology" },
        { _id: "2", name: "Programming", slug: "programming" },
        { _id: "3", name: "Web Development", slug: "web-development" },
        { _id: "4", name: "Mobile Development", slug: "mobile-development" },
        { _id: "5", name: "Data Science", slug: "data-science" },
        { _id: "6", name: "DevOps", slug: "devops" },
        { _id: "7", name: "AI & Machine Learning", slug: "ai-machine-learning" },
        { _id: "8", name: "Cybersecurity", slug: "cybersecurity" },
        { _id: "9", name: "Cloud Computing", slug: "cloud-computing" },
        { _id: "10", name: "Software Engineering", slug: "software-engineering" }
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