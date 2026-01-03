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
    FormControl,
    InputLabel,
    Select,
    MenuItem
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

export default function RecreationalAthleteEnquiryForm() {
    const [sport, setSport] = useState<string>('')
    const [companion, setCompanion] = useState<string>('Just me')

    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* Your Sport */}
                <div>
                    <h4 className={styles.label}>
                        Your sport:
                        <span className={styles.subLabel}>(Choose)</span>
                    </h4>
                    <RadioGroup
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {["Running", "Cycling", "Triathlon", "Other endurance"].map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* Personal Info */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                    <TextField fullWidth label="Your name" variant="outlined" />
                    <TextField fullWidth label="Email & WhatsApp / phone" variant="outlined" />
                    <TextField fullWidth label="Where you're based (City, country)" variant="outlined" className="md:col-span-2" />
                </Box>

                {/* Trip Dates */}
                <div>
                    <h4 className={styles.label}>Your ideal trip dates:</h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <TextField fullWidth label="From" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                        <TextField fullWidth label="To" type="date" InputLabelProps={{ shrink: true }} variant="outlined" />
                    </Box>
                </div>

                {/* Who am I with? */}
                <div>
                    <h4 className={styles.label}>
                        Who am i with?
                        <span className={styles.subLabel}>(Select)</span>
                    </h4>
                    <RadioGroup
                        value={companion}
                        onChange={(e) => setCompanion(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {["Just me", "With partner", "With friends / club", "Family"].map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* Special Requests */}
                <div>
                    <h4 className={styles.label}>Anything to make this your dream race trip?</h4>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder="Free text"
                        variant="outlined"
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
                        Book My Race Adventure
                    </Button>
                    <p className="text-center md:text-right text-neutral-500 text-sm max-w-md">
                        We confirm your race, send transparent options, lock it all down. Then you run, ride, or tri – we&apos;ve got the rest.
                    </p>
                </div>
            </form>
        </ThemeProvider>
    )
}
