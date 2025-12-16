'use client'

import React, { useState } from 'react'
import { Plus, Edit2, Trash2, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'

interface Event {
    id: string
    title: string
    venue: string
    date: string
    time: string
    price: number
    category: string
    sport: string
}

const initialEvents: Event[] = [
    { id: '1', title: 'Champions League Final', venue: 'Wembley Stadium', date: '2025-05-28', time: '20:00', price: 150, category: 'SPORTS', sport: 'Football' },
    { id: '2', title: 'NBA All-Star Game', venue: 'Madison Square Garden', date: '2025-02-16', time: '19:30', price: 300, category: 'SPORTS', sport: 'Basketball' },
    { id: '3', title: 'Wimbledon Final', venue: 'All England Club', date: '2025-07-13', time: '14:00', price: 250, category: 'SPORTS', sport: 'Tennis' },
]

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>(initialEvents)
    const [isEditing, setIsEditing] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        venue: '',
        date: '',
        time: '',
        price: '',
        sport: ''
    })

    const handleEdit = (event: Event) => {
        setIsEditing(true)
        setCurrentEvent(event)
        setFormData({
            title: event.title,
            venue: event.venue,
            date: event.date,
            time: event.time,
            price: event.price.toString(),
            sport: event.sport
        })
    }

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(e => e.id !== id))
            toast.success('Event deleted successfully')
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (isEditing && currentEvent) {
            setEvents(events.map(e => e.id === currentEvent.id ? {
                ...e,
                ...formData,
                price: parseFloat(formData.price)
            } : e))
            toast.success('Event updated successfully')
        } else {
            const newEvent: Event = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                price: parseFloat(formData.price),
                category: 'SPORTS' // Default for now
            }
            setEvents([...events, newEvent])
            toast.success('Event added successfully')
        }

        resetForm()
    }

    const resetForm = () => {
        setIsEditing(false)
        setCurrentEvent(null)
        setFormData({ title: '', venue: '', date: '', time: '', price: '', sport: '' })
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
                <h1 className="text-3xl font-bold">Manage Events</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">{isEditing ? 'Edit Event' : 'Add New Event'}</CardTitle>
                            <CardDescription className="text-gray-400">
                                {isEditing ? 'Update the details of the event.' : 'Schedule a new event.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-white">Event Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. World Cup Final"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sport" className="text-white">Sport</Label>
                                        <Select
                                            value={formData.sport}
                                            onValueChange={(value) => setFormData({ ...formData, sport: value })}
                                        >
                                            <SelectTrigger className="bg-white/10 border-white/10 text-white">
                                                <SelectValue placeholder="Select sport" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#11212D] border-white/10 text-white">
                                                <SelectItem value="Football" className="hover:bg-white/10 focus:bg-white/10">Football</SelectItem>
                                                <SelectItem value="Basketball" className="hover:bg-white/10 focus:bg-white/10">Basketball</SelectItem>
                                                <SelectItem value="Tennis" className="hover:bg-white/10 focus:bg-white/10">Tennis</SelectItem>
                                                <SelectItem value="Cricket" className="hover:bg-white/10 focus:bg-white/10">Cricket</SelectItem>
                                                <SelectItem value="Rugby" className="hover:bg-white/10 focus:bg-white/10">Rugby</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="price" className="text-white">Price ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            required
                                            className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="venue" className="text-white">Venue</Label>
                                    <Input
                                        id="venue"
                                        placeholder="Stadium or Arena Name"
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date" className="text-white">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                            className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 [color-scheme:dark]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time" className="text-white">Time</Label>
                                        <Input
                                            id="time"
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                            className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                                        {isEditing ? 'Update Event' : 'Add Event'}
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
                <div className="xl:col-span-2">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Events List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors gap-4">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-semibold text-lg text-white">{event.title}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                    {event.sport}
                                                </span>
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {event.date} at {event.time}
                                                </div>
                                                <div>📍 {event.venue}</div>
                                                <div>💰 ${event.price.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="flex sm:flex-col gap-2 justify-end">
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {events.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">No events scheduled.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
