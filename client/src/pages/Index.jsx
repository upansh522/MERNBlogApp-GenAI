import BlogCard from '@/components/BlogCard'
import SearchBox from '@/components/SearchBox'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    })
   
    if (loading) return <Loading />
    return (
        <div>
            <section className='relative rounded-2xl p-8 md:p-12 mb-8 md:mb-10 bg-gradient-to-b from-white via-gray-50 to-white shadow-lg shadow-gray-200/60 overflow-hidden'>
                <span className='pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-200/70 to-transparent'></span>
                <div className='mx-auto max-w-3xl text-center relative'>
                    <h1 className='text-4xl md:text-6xl tracking-tight mb-4'>
                        <span className='font-normal'>Your own </span>
                        <span className='text-black font-extrabold'>blogging</span>
                        <span className='font-normal'> platform.</span>
                    </h1>
                    <p className='text-gray-600 mb-6'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>
                    <div className='flex items-center gap-2 max-w-xl mx-auto'>
                        <div className='flex-1'>
                            <SearchBox />
                        </div>
                        
                    </div>
                </div>
            </section>

            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8 items-stretch'>
                {blogData && blogData.blog.length > 0
                    ?
                    blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
                    :
                    <div>Data Not Found.</div>
                }
            </div>
        </div>
    )
}

export default Index