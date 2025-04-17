
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-7xl font-bold text-fitflex-purple mb-6">404</h1>
        <p className="text-2xl text-gray-700 mb-8">
          Oops! This page is still being developed
        </p>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          We're working hard to bring you a complete fitness experience. Please check back soon!
        </p>
        <Button className="btn-gradient" asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
