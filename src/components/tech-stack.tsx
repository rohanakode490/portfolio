import React, { useState } from 'react'
import { Badge } from './ui/badge';

export default function TechStack({ technologies, maxTech = 4 }: { technologies: string[], maxTech?: number }) {
    const [showAllTechs, setShowAllTechs] = useState<boolean>(false)

    const displayTechs = showAllTechs ? technologies : technologies.slice(0, maxTech);
    const hasMore = technologies.length > maxTech;
    const remainingTechs = technologies.length - maxTech;

    return (
        <>
            {displayTechs.map((tech, index) => (
                <Badge key={index} variant="secondary" className='text-xs px-2 py-0.5'>
                    {tech}
                </Badge>
            ))}

            {hasMore && !showAllTechs && (
                <Badge
                    variant="outline"
                    className='text-xs px-2 py-0.5 cursor-pointer hover:bg-muted'
                    onClick={() => setShowAllTechs(true)}
                    title={`Show all ${technologies.length} technologies`}
                >
                    +{remainingTechs}
                </Badge>
            )}

            {showAllTechs && (
                <Badge
                    variant="outline"
                    className='text-xs px-2 py-0.5 cursor-pointer hover:bg-muted'
                    onClick={() => setShowAllTechs(false)}
                    title='Collapse technologies list'
                >
                    -Hide
                </Badge>
            )}
        </>
    )
}
