import React from 'react';
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by Jenil Desai
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/Jenil-Desai/torin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/desaijenil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com/Jenxl_09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
