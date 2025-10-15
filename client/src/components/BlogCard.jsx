import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from "@/components/ui/badge"
import { useSelector } from 'react-redux'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { FaRegCalendarAlt } from "react-icons/fa";
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'
const BlogCard = ({ props }) => {
 
    return (
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
            <Card className="h-full overflow-hidden rounded-xl border bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <CardContent className="p-0 flex flex-col">
                    <div className='relative'>
                        <img src={props.featuredImage} className='w-full h-48 sm:h-56 md:h-44 object-cover' />
                        {props?.category?.name && (
                            <span className='absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/80 text-white backdrop-blur'>
                                {props.category.name}
                            </span>
                        )}
                    </div>
                    <div className='p-4 flex flex-col gap-2'>
                        <h2 className='text-xl md:text-2xl font-bold leading-snug line-clamp-2 min-h-[3rem]'>
                            {props.title}
                        </h2>
                        <div className='flex items-center justify-between pt-2 border-t'>
                            <div className='flex items-center gap-2'>
                                <Avatar>
                                    <AvatarImage src={props.author.avatar || usericon} />
                                </Avatar>
                                <span className='text-sm'>{props.author.name}</span>
                            </div>
                            <span className='flex items-center gap-1 text-sm text-gray-600'>
                                <FaRegCalendarAlt />
                                {moment(props.createdAt).format('DD-MM-YYYY')}
                            </span>
                        </div>
                        {props.author.role === 'admin' && (
                            <div className='pt-1'>
                                <Badge variant="outline" className="bg-black text-white">Admin</Badge>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard