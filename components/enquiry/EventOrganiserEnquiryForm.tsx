"use client"

import React, { useState } from 'react'
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    Radio,
    RadioGroup,
    Typography
} from '@mui/material'

// Reusing same theme setup
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37',
        },
        background: {
            paper: '#000000',
            default: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
        },
    },
    typography: {
        fontFamily: 'inherit',
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffffff',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37',
                        },
                        color: '#ffffff',
                    },
                    '& .MuiInputLabel-root': {
                        color: '#a3a3a3',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#D4AF37',
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-checked': {
                        color: '#D4AF37',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-checked': {
                        color: '#D4AF37',
                    },
                },
            },
        },
    },
})

const styles = {
    label: "text-lg font-normal text-white mb-4 block",
    subLabel: "text-neutral-500 text-sm font-normal ml-2"
}

export default function EventOrganiserEnquiryForm() {
    const [planningStage, setPlanningStage] = useState<string>('')

    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* Event Vision */}
                <div>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Tell us about your event (your vision & context)"
                        placeholder='Example: "Annual marathon targeting 1,000+ runners..."'
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </div>

                {/* Challenges */}
                <div>
                    <h4 className={styles.label}>
                        What&apos;s your main challenge right now?
                        <span className={styles.subLabel}>(Check all that apply)</span>
                    </h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '0.5rem' }}>
                        {[
                            "Event management & overall coordination",
                            "Permits, venue, & logistics",
                            "Participant experience & travel support",
                            "Registration, communication & tech platform",
                            "Sponsorship & corporate partnerships",
                            "Day-of execution & ground operations",
                            "Route design & safety management",
                            "Post-event analytics & participant retention",
                            "Other"
                        ].map((item) => (
                            <FormControlLabel
                                key={item}
                                control={<Checkbox />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </Box>
                </div>

                {/* Event Basics */}
                <div>
                    <h4 className={styles.label}>Event basics:</h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                        <TextField fullWidth label="Event name" variant="outlined" />
                        <TextField fullWidth label="State / region" variant="outlined" />
                        <TextField fullWidth label="Expected participants" variant="outlined" />
                        <TextField fullWidth label="Event date (or target month/season)" variant="outlined" />
                    </Box>
                </div>

                {/* Your Background */}
                <div>
                    <h4 className={styles.label}>Your background:</h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                        <TextField fullWidth label="Organization name / Club / NGO / Individual" variant="outlined" />
                        <TextField fullWidth label="Your role / title" variant="outlined" />
                    </Box>
                </div>

                {/* Planning Stage */}
                <div>
                    <h4 className={styles.label}>Where you&apos;re at in planning:</h4>
                    <RadioGroup
                        value={planningStage}
                        onChange={(e) => setPlanningStage(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {[
                            "Very early – just an idea",
                            "Concept stage – need guidance",
                            "Planning mode – let's lock it down",
                            "Near final – need extra hands & expertise",
                            "Already running it – need scaling support"
                        ].map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* Contact Details */}
                <div>
                    <h4 className={styles.label}>Your contact details:</h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                        <TextField fullWidth label="Name" variant="outlined" />
                        <TextField fullWidth label="Email" variant="outlined" />
                        <TextField fullWidth label="WhatsApp / phone (with country code)" variant="outlined" />
                        <TextField fullWidth label="City / State" variant="outlined" />
                    </Box>
                </div>

                {/* Additional Info */}
                <div>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Anything else we should know? (Constraints, unique aspects, vision)"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center md:items-end pt-8 gap-4">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            padding: '1rem 2rem',
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            borderRadius: '0.375rem',
                            backgroundColor: '#D4AF37',
                            color: '#ffffff',
                            width: { xs: '100%', md: 'auto' },
                            '&:hover': {
                                backgroundColor: '#b3922b',
                            }
                        }}
                    >
                        Start the Partnership
                    </Button>
                    <p className="text-center md:text-right text-neutral-500 text-sm max-w-md">
                        We review your event within 24 hours and call to discuss partnership options, timeline, and pricing fully transparent, zero hidden costs.
                    </p>
                </div>
            </form>
        </ThemeProvider>
    )
}
