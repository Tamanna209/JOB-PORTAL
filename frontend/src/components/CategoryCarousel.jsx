import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
const Category=[
  "Frontend Developer",
  "Backend Developer",
  "Data Sc", 
  "Machine Learning",
  "Deep Learning",
  "Full Stack Developer",
  "DevOps Engineer",
  "Blockchain Developer",
  "Mobile App Developer",
  "Game Developer",
  "UI/UX Designer",
  "Cloud Developer",
  "Security Expert",
  "Digital Marketing Expert",
  "SEO Expert",
  "Content Writer",
  "Video Editor",
  "Graphic Designer",
  "Business Analyst",
  "Project Manager",
  "Product Manager",
  "Data Analyst",
  "Data Entry Operator",
  "Virtual Assistant",
  "Customer Support",
  "Sales Executive",
  "HR Executive",
  "Finance Executive",
  "Accountant",
  "Lawyer",
  "Teacher",
  "Consultant",
  "Others",
  "Internship",
  "Part Time",
  "Full Time",
  "Work From Home",
  "Freelancer",
  "Remote",
  "Contractual",
  "Temporary",
  "Permanent",
  "Volunteer",
  "Fresher",
  "Experienced",
  "Student",
  "Professional",
  "Beginner",
  "Intermediateence",
   "Graphic Designer",
   "Full Stack Developer"

]
const CategoryCarousel = () => {
  return (
    <div>
       <Carousel className='w-full max-w-xl mx-auto my-20'>
      
          <CarouselContent>
            {
              Category.map((cat, inde)=> (
                <CarouselItem className='md:basis-1/2 lg-basis-1/3'>
                   <Button variant="outline" className="rounded-full">{cat}</Button>
                </CarouselItem>
              ))
            }        
          </CarouselContent>
          <CarouselPrevious/>  
          <CarouselNext/>
       </Carousel>
    </div>
  )
}

export default CategoryCarousel
