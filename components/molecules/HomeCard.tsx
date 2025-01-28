import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';

interface HomeCardProps {
  title: string;
  description: string;
  url: string;
}

function HomeCard({ title, description, url }: HomeCardProps) {
  return (
    <Link href={url}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default HomeCard;
