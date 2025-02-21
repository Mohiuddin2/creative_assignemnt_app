
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-base-200 text-base-content p-8">
      <div className="max-w-5xl mx-auto text-center py-10">
        <h1 className="text-5xl font-bold text-primary">Welcome to Creative ASA</h1>
        <p className="mt-4 text-lg text-secondary">
          The ultimate digital platform for hassle-free assignment submissions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 py-10">
        <Image 
          src="https://images.pexels.com/photos/6001386/pexels-photo-6001386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          width={600}
          height={300}
          alt="Students submitting assignments"
          className="rounded-lg shadow-lg"
        />
        <div className="text-lg">
          <h2 className="text-3xl font-semibold text-accent">Why Choose Creative ASA?</h2>
          <p className="mt-4">
            In today’s digital world, managing assignments has never been easier. 
            Creative ASA allows students to submit their work effortlessly, while teachers 
            can review, rate, and provide feedback—all in one place.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>📂 Easy Submission Process</li>
            <li>🔔 Instant Notifications</li>
            <li>⭐ Teacher Feedback & Ratings</li>
            <li>📊 Progress Tracking</li>
            <li>🔒 Secure & Reliable Platform</li>
          </ul>

          <div className="why-choose-container">
      <h2 className='text-3xl mt-3'>Why Choose Creative ASA?</h2>
      <p>
        In today’s digital age, managing assignments has never been simpler. Creative ASA streamlines the process for both students and teachers, offering an easy-to-use platform to submit, review, rate, and provide feedback—all in one place.
      </p>
      <ul>
        <li>
          <strong>📂 Easy Submission Process</strong>: Students can quickly and easily submit assignments with just a few clicks.
        </li>
        <li>
          <strong>🔔 Instant Notifications</strong>: Stay updated with real-time alerts about your assignment status, feedback, and grades.
        </li>
        <li>
          <strong>⭐ Teacher Feedback & Ratings</strong>: Teachers can leave detailed feedback and rate submissions to help students improve.
        </li>
        <li>
          <strong>📊 Progress Tracking</strong>: Monitor your academic progress through easy-to-read reports on your submissions.
        </li>
        <li>
          <strong>🔒 Secure & Reliable Platform</strong>: Your data and assignments are protected with the highest security standards, ensuring reliability and peace of mind.
        </li>
      </ul>
    </div>
        </div>
        
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold text-center text-secondary">How It Works?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-base-100 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-primary">For Students</h3>
            <p className="mt-2">
              Simply upload your assignments and submit them in just a few clicks.
              Stay updated with notifications and track your progress easily.
            </p>
          </div>
          <div className="p-6 bg-base-100 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-primary">For Teachers</h3>
            <p className="mt-2">
              Review assignments, provide feedback, and rate students’ work efficiently.
              No more paperwork, everything is digital and organized.
            </p>
          </div>
          <div className="p-6 bg-base-100 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-primary">Performance Tracking</h3>
            <p className="mt-2">
              Students can monitor their grades and feedback, allowing them to 
              improve their performance over time.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-accent">Watch How It Works</h2>
        <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <Image 
            src="https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg" 
            width={600} 
            height={300} 
            alt="Watch video"
            className="rounded-lg shadow-lg mt-4"
          />
        </Link>
      </div>

      <div className="py-10">
        <h2 className="text-4xl font-bold text-center text-secondary">Join Now!</h2>
        <p className="text-center mt-4">
          Experience a revolutionary way of managing assignments. Whether you’re a 
          student or a teacher, Creative ASA is designed to simplify your workload.
        </p>
        <div className="flex justify-center mt-6">
          <Link href="/signup" className="btn btn-primary px-6 py-3 text-lg">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

