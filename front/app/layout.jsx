import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navbar.jsx';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Blog Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src={`https://cdn.tiny.cloud/1/${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}/tinymce/5/tinymce.min.js`} referrerPolicy="origin"></script>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}