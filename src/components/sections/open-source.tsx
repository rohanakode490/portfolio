"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Card } from "../ui/card"
import { LuGitPullRequest, LuGitMerge, LuGithub, LuExternalLink, LuChevronDown, LuSearch } from "react-icons/lu"
import { IconType } from "react-icons";
import { Badge } from "../ui/badge"
import Link from "next/link"
import { useMemo, useState } from "react"
import TechStack from "../tech-stack"
import { Input } from "../ui/input"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

const contributions = [
    {
        repo: "mockoon/mockoon.com",
        title: "feat: add replace and replaceAll templating helpers", 
        image: "https://avatars.githubusercontent.com/u/49429147?s=48&v=4",
        status: "open",
        url: "https://github.com/mockoon/mockoon/pull/2100", 
        date: "Feb 2026",
        oneLiner: "Added `replace` and `replaceAll` helpers to the templating engine for safer string manipulation.",
        description: "Introduced two new templating helpers — `replace` and `replaceAll` — enabling safer and flexible string manipulation in template expressions. Implemented logic to handle global replacements using escaped regular expressions in environments lacking native support, while gracefully handling edge cases like empty search terms. Registered the helpers in the templating registry, added autocomplete support for the editor, and ensured robust behavior with a comprehensive test suite.",
        tech: ["Angular", "TypeScript"] 
    },
    {
        repo: "mockoon/mockoon.com",
        title: "Add recently used commands to command palette", 
        image: "https://avatars.githubusercontent.com/u/49429147?s=48&v=4",
        status: "merged",
        url: "https://github.com/mockoon/mockoon/pull/2091", 
        date: "Feb 2026",
        oneLiner: "Enhanced command palette by adding a ‘Recent Commands’ section for quicker access.",
        description: "Introduced a recently used commands feature to the Command Palette that tracks and surfaces the last 10 unique commands. Pinned these recent commands to the top of search results and kept them persistent across sessions, allowing users to quickly rediscover frequently used actions and improve productivity.",
        tech: ["Angular", "TypeScript"] 
    },
    {
        repo: "mockoon/mockoon.com",
        title: "docs: add base64url and base64urlDecode templating helpers", 
        image: "https://avatars.githubusercontent.com/u/49429147?s=48&v=4",
        status: "merged",
        url: "https://github.com/mockoon/mockoon.com/pull/185", 
        date: "Feb 2026",
        oneLiner: "Added documentation for Base64URL templating helpers to keep site guides in sync.",
        description: "Updated the official Mockoon documentation to include the newly introduced `base64url` and `base64urlDecode` templating helpers. Added detailed usage examples, descriptions of arguments, and updated the summary table, ensuring users can discover and use these features effectively.",
        tech: ["Markdown", "Documentation"],
    },
    {
        repo: "mockoon/mockoon",
        title: "feat: add header name and value auto-completion to response rules",
        image: "https://avatars.githubusercontent.com/u/49429147?s=48&v=4",
        status: "merged",
        url: "https://github.com/mockoon/mockoon/pull/2083",
        date: "Jan 2026",
        oneLiner: "Added header auto-completion to reduce errors in response rules.",
        description:
            "Improved the response rule creation flow by adding auto-completion for header names and common values. This aligned the behavior with existing header inputs, reduced the likelihood of user typos, and provided contextual suggestions only when the rule type was set to headers.",
        tech: ["Angular", "TypeScript"],
    },
    {
        repo: "mockoon/mockoon",
        title: "feat: add base64url and base64urlDecode templating helpers", 
        image: "https://avatars.githubusercontent.com/u/49429147?s=48&v=4",
        status: "merged",
        url: "https://github.com/mockoon/mockoon/pull/2082",
        date: "Jan 2026",
        oneLiner: "Added Base64URL encode/decode helpers for templating.",
        description:
            "Introduced new templating helpers to support URL-safe Base64 encoding and decoding, commonly used in JWTs and URL parameters. Implemented reusable utilities, integrated them into the templating system with editor autocompletion, and added full unit test coverage across core libraries and CLI to ensure correctness.",
        tech: ["TypeScript", "Node.js"],
    },
    {
        repo: "fshikijs/textmate-grammars-themes",
        title: "fix: fix visibility of incomplete strings",
        image: "https://avatars.githubusercontent.com/u/69196822?s=48&v=4",
        status: "merged",
        url: "https://github.com/shikijs/textmate-grammars-themes/pull/178",
        date: "Jan 2026",
        oneLiner: "Fixed invisible incomplete strings in the One Light theme.",
        description:
            "Fixed a visibility issue where unclosed or incomplete strings were rendered in a color that blended into the background. Updated the token color mapping so illegal or unfinished strings remain clearly visible, improving readability and debugging during active code editing.",
        tech: ["TypeScript"],
    },
    {
        repo: "fshikijs/textmate-grammars-themes",
        title: "feat: introduce Night Owl Light theme", 
        image: "https://avatars.githubusercontent.com/u/69196822?s=48&v=4",
        status: "merged",
        url: "https://github.com/shikijs/textmate-grammars-themes/pull/177", 
        date: "Jan 2026",
        oneLiner: "Added the Night Owl Light theme and fixed its broken background rendering.",
        description:
            "Introduced the Night Owl Light theme to the theme collection and identified an upstream issue where it rendered with a dark background due to an incorrect global rule. Implemented a patch during the theme fetch process to remove the conflicting rule, ensuring the theme displayed with its intended light background.",
        tech: ["TypeScript"],
    },
    {
        repo: "activepieces/activepieces",
        title: "feat: redesign ai actions ui to align with figma design",
        image: "https://avatars.githubusercontent.com/u/99494700?s=48&v=4",
        status: "closed",
        url:"https://github.com/activepieces/activepieces/pull/10942",
        date: "Jan 2026",
        oneLiner: "Redesigned Flow Builder actions UI with video previews.",
        description:
            "Updated the Flow Builder UI to match the latest Figma design by introducing a clearer two-column layout and hover-based video previews for actions. This improved visual clarity and discoverability while keeping existing behavior unchanged, with a fallback image to ensure a clean UI when video content is unavailable.",
        tech: ["React", "Tailwind CSS", "Figma"],
    }
]

const statusConfig: Record<string, { color: string, icon: IconType }> = {
    open: {
        color: "bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20",
        icon: LuGitPullRequest
    },
    merged: {
        color: "bg-purple-500/10 text-purple-600 border-purple-500/30 hover:bg-purple-500/20",
        icon: LuGitMerge
    },
    closed: {
        color: "bg-red-500/10 text-red-600 border-red-500/30 hover:bg-red-500/20",
        icon: LuGitPullRequest
    }
}

const fuzzyMatch = (query: string, text: string): boolean => {
    const q = query.toLowerCase().replace(/\s+/g, "");
    const t = text.toLowerCase().replace(/\s+/g, "");
    let qIdx = 0, tIdx = 0;
    while (qIdx < q.length && tIdx < t.length) {
        if (q[qIdx] === t[tIdx]) qIdx++;
        tIdx++;
    }
    return qIdx === q.length;
};

export default function OpenSource() {
    const searchParams = useSearchParams()
    
    // Initialize from URL but don't sync back
    const [localQuery, setLocalQuery] = useState(searchParams.get("filter") || "")
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

    // Pre-calculate searchable strings once
    const preparedContributions = useMemo(() => {
        return contributions.map(item => ({
            ...item,
            searchContent: `${item.title} ${item.repo} ${item.tech.join(" ")}`.toLowerCase()
        }))
    }, [])

    const filteredContributions = useMemo(() => {
        const q = localQuery.trim().toLowerCase()
        if (!q) return preparedContributions;
        return preparedContributions.filter(item => fuzzyMatch(q, item.searchContent));
    }, [localQuery, preparedContributions]);

    return (
        <div className="space-y-6 mt-4">
            <div className="relative group">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors w-4 h-4" />
                <Input
                    placeholder="Search by title, repo, or language (fuzzy)..."
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="pl-10 h-11 bg-card/20 border-border/40 hover:border-primary/30 transition-all"
                />
                {localQuery && (
                    <button onClick={() => setLocalQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer">
                        Clear
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredContributions.map((item, index) => {
                        const isExpanded = expandedIndex === index
                        const status = statusConfig[item.status] || statusConfig.open
                        const StatusIcon = status.icon

                        return (
                            <motion.div
                                key={`${item.repo}-${item.title}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                                layout
                            >
                                <Card 
                                    className={`transition-all duration-300 bg-transparent border-border/50 overflow-hidden cursor-pointer group ${isExpanded ? 'shadow-md ring-1 ring-primary/20' : 'hover:shadow-md'}`}
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                >
                                    <div className="flex flex-col p-4 md:p-6">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border border-primary/10 relative">
                                                {item.image && !imageErrors[index] ? (
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.repo} 
                                                        fill 
                                                        className="object-cover" 
                                                        onError={() => setImageErrors(p => ({...p, [index]: true}))} 
                                                    />
                                                ) : (
                                                    <LuGithub className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-base md:text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                                            <p className="text-xs md:text-sm font-mono text-primary mt-1 opacity-80">{item.repo}</p>
                                                        </div>
                                                        <Badge variant="outline" className={`text-[10px] sm:text-xs uppercase h-6 font-bold px-2 ${status.color}`}>
                                                            <StatusIcon className="w-3 h-3 mr-1.5" />
                                                            {item.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-4">
                                                        <p className="text-muted-foreground text-sm font-medium italic">{item.oneLiner}</p>
                                                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-primary/60 ml-4 p-1 rounded-full bg-primary/5">
                                                            <LuChevronDown className="w-5 h-5" />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "circOut" }} className="overflow-hidden">
                                                    <div className="pt-6 border-t border-border/40 mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                                        <div className="md:col-span-2 space-y-4">
                                                            <div>
                                                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Contribution Details</h4>
                                                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 pt-2"><TechStack technologies={item.tech} /></div>
                                                        </div>
                                                        <div className="space-y-6 md:border-l md:border-border/40 md:pl-8">
                                                            <div>
                                                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Timeline</h4>
                                                                <p className="text-sm font-semibold text-foreground">{item.date}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Links</h4>
                                                                <Link href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all w-full justify-center shadow-lg shadow-primary/20" onClick={(e) => e.stopPropagation()}>
                                                                    <LuGithub className="w-4 h-4" /> View Pull Request <LuExternalLink className="w-3.5 h-3.5 ml-1" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                
                {filteredContributions.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 bg-card/10 rounded-3xl border border-dashed border-border">
                        <p className="text-muted-foreground">No contributions match your search.</p>
                        <button onClick={() => setLocalQuery("")} className="mt-2 text-primary font-bold hover:underline">Reset filter</button>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
