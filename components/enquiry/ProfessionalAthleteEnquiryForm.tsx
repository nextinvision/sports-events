"use client"

import React, { useState } from 'react'
import {
    TextField,
    FormControlLabel,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    FormControl,
    InputLabel
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
        MuiSelect: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ffffff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#D4AF37',
                    },
                },
                icon: {
                    color: '#a3a3a3',
                }
            }
        }
    },
})

const styles = {
    label: "text-lg font-normal text-white mb-4 block",
    subLabel: "text-neutral-500 text-sm font-normal ml-2"
}

export default function ProfessionalAthleteEnquiryForm() {
    const [whoAmI, setWhoAmI] = useState<string>('')
    const [tripType, setTripType] = useState<string>('')

    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* Who am I? */}
                <div>
                    <h4 className={styles.label}>
                        Who am I?
                        <span className={styles.subLabel}>(Choose)</span>
                    </h4>
                    <RadioGroup
                        value={whoAmI}
                        onChange={(e) => setWhoAmI(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {["Individual athlete", "Small team (up to 10)", "Larger team / delegation (10+)"].map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* Details */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                    <TextField fullWidth label="Athlete / team name" variant="outlined" />
                    <TextField fullWidth label="Your sport & discipline (e.g., 100m sprint)" variant="outlined" />
                    <TextField fullWidth label="Contact person name" variant="outlined" />
                    <TextField fullWidth label="Email & WhatsApp / phone" variant="outlined" />
                    <TextField fullWidth label="City / closest airport" variant="outlined" className="md:col-span-2" />
                </Box>

                {/* Trip Purpose */}
                <div>
                    <h4 className={styles.label}>
                        This trip is for:
                        <span className={styles.subLabel}>(Choose)</span>
                    </h4>
                    <RadioGroup
                        value={tripType}
                        onChange={(e) => setTripType(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {[
                            "Competition / tournament",
                            "Training camp",
                            "Trials / selection",
                            "Return-to-play / rehab camp",
                            "Other"
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

                {/* Trip Details & Budget */}
                <div>
                    <h4 className={styles.label}>Trip details & budget:</h4>
                    <Box sx={{ display: 'grid', gap: '2rem' }}>
                        <TextField fullWidth label="Event name & location" variant="outlined" />
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <TextField fullWidth label="Travel Start Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                            <TextField fullWidth label="Travel End Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                        </Box>
                    </Box>
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
                        Lock In Support
                    </Button>
                    <p className="text-center md:text-right text-neutral-500 text-sm max-w-md">
                        We confirm event details, lock pricing, and handle everything. You can focus on the performance.
                    </p>
                </div>
            </form>
        </ThemeProvider>
    )
}
