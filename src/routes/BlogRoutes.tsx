import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPost1 from '../pages/blogpost/BlogPost1';
import BlogPost2 from '../pages/blogpost/BlogPost2';
import {BlogPost3} from '../pages/blogpost/BlogPost3';
import {BlogPost4} from '../pages/blogpost/BlogPost4';
import BlogPost5 from '../pages/blogpost/BlogPost5';
import BlogPost6 from '../pages/blogpost/BlogPost6';
import {BlogPost7} from '../pages/blogpost/BlogPost7';
import {BlogPost8} from '../pages/blogpost/BlogPost8';
import BlogPost9 from '../pages/blogpost/BlogPost9';
import BlogPost10 from '../pages/blogpost/BlogPost10';

const BlogRoutes = () => {
  return (
    <Routes>
      <Route path="/1" element={<BlogPost1 />} />
      <Route path="/2" element={<BlogPost2 />} />
      <Route path="/3" element={<BlogPost3 />} />
      <Route path="/4" element={<BlogPost4 />} />
      <Route path="/5" element={<BlogPost5 />} />
      <Route path="/6" element={<BlogPost6 />} />
      <Route path="/7" element={<BlogPost7 />} />
      <Route path="/8" element={<BlogPost8 />} />
      <Route path="/9" element={<BlogPost9 />} />
      <Route path="/10" element={<BlogPost10 />} />

      {/* Add more blog routes here as needed */}
    </Routes>
  );
};

export default BlogRoutes;

