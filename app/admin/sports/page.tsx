'use client'

import React, { useState } from 'react'
import { Plus, Edit2, Trash2, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import toast from 'react-hot-toast'

interface Sport {
    id: string
    name: string
    description: string
    imageUrl?: string
}

const initialSports: Sport[] = [
    { id: '1', name: 'Football', description: 'The beautiful game played with a round ball.', imageUrl: '/images/football.jpg' },
    { id: '2', name: 'Basketball', description: 'Fast-paced game played on a court.', imageUrl: '/images/basketball.jpg' },
    { id: '3', name: 'Tennis', description: 'Racket sport played individually or in pairs.', imageUrl: '/images/tennis.jpg' },
    { id: '4', name: 'Cricket', description: 'Bat-and-ball game played between two teams.', imageUrl: '/images/cricket.jpg' },
    { id: '5', name: 'Rugby', description: 'Contact team sport with an oval ball.', imageUrl: '/images/rugby.jpg' },
]

export default function AdminSportsPage() {
    const [sports, setSports] = useState<Sport[]>(initialSports)
    const [isEditing, setIsEditing] = useState(false)
    const [currentSport, setCurrentSport] = useState<Sport | null>(null)
    const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' })

    const handleEdit = (sport: Sport) => {
        setIsEditing(true)
        setCurrentSport(sport)
        setFormData({ name: sport.name, description: sport.description, imageUrl: sport.imageUrl || '' })
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this sport?')) {
            setSports(sports.filter(s => s.id !== id))
            toast.success('Sport deleted successfully')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (isEditing && currentSport) {
            setSports(sports.map(s => s.id === currentSport.id ? { ...s, ...formData } : s))
            toast.success('Sport updated successfully')
        } else {
            const newSport: Sport = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData
            }
            setSports([...sports, newSport])
            toast.success('Sport added successfully')
        }

        resetForm()
    }

    const resetForm = () => {
        setIsEditing(false)
        setCurrentSport(null)
        setFormData({ name: '', description: '', imageUrl: '' })
    }

    return (
        <div className="container mx-auto px-4 py-24 bg-[#11212D] min-h-screen text-white">
            <div className="mb-8">
                <Link href="/admin">
                    <Button variant="ghost" className="mb-4 pl-0 text-gray-400 hover:text-white hover:bg-transparent group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Manage Sports</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">{isEditing ? 'Edit Sport' : 'Add New Sport'}</CardTitle>
                            <CardDescription className="text-gray-400">
                                {isEditing ? 'Update the details of the sport.' : 'Add a new sport to the catalog.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Football"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-white">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Short description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl" className="text-white">Image URL (Optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        placeholder="/images/sport.jpg"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                        {isEditing ? 'Update Sport' : 'Add Sport'}
                                    </Button>
                                    {isEditing && (
                                        <Button type="button" variant="outline" onClick={resetForm} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Sports List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {sports.map((sport) => (
                                    <div key={sport.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                                        <div>
                                            <h3 className="font-semibold text-lg text-white">{sport.name}</h3>
                                            <p className="text-sm text-gray-400">{sport.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(sport)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(sport.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {sports.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">No sports found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
