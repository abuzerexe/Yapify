import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup.tsx'
import { Signin } from './pages/Signin.tsx'
import { Blog } from './pages/Blog.tsx'
import { Blogs } from './pages/Blogs.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <Toaster position='bottom-left'/>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            {/* <Route path='/blog/publish' element={<Publish} */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App