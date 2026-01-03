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
    Stack,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel
} from '@mui/material'
import { styled } from '@mui/system'

// Custom Theme for Dark Mode + Gold Accents
// Reusing the theme from PartnershipForm for consistency
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Gold
        },
        background: {
            paper: '#000000',
            default: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a3a3a3', // neutral-400
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

interface EnquiryFormProps {
    defaultPlayType?: string;
}

export default function EnquiryForm({ defaultPlayType = '' }: EnquiryFormProps) {
    const [playType, setPlayType] = useState(defaultPlayType)
    const [timeframe, setTimeframe] = useState('')

    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* What's your play? */}
                <div>
                    <h4 className={styles.label}>
                        What&apos;s your play?
                        <span className={styles.subLabel}>(Choose one)</span>
                    </h4>
                    <RadioGroup
                        value={playType}
                        onChange={(e) => setPlayType(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {[
                            "I'm a fan chasing the perfect match day",
                            "I'm an athlete, need logistics support",
                            "I'm training for a sporting event",
                            "Team / group getaway",
                            "Other enquiries"
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

                {/* Contact Information */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem 6rem' }}>
                    <TextField fullWidth label="Your name" variant="outlined" />
                    <TextField fullWidth label="Email" variant="outlined" />
                    <TextField fullWidth label="WhatsApp / phone (with country)" variant="outlined" />
                    <TextField fullWidth label="Where are you based? (City, country)" variant="outlined" />
                </Box>

                {/* Quick Pitch */}
                <div>
                    <h4 className={styles.label}>Quick pitch: What&apos;s the dream?</h4>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Free text – tell us your vision"
                        InputProps={{
                            style: { fontSize: '1rem', lineHeight: '1.6' }
                        }}
                    />
                </div>

                {/* Timeframe */}
                <div>
                    <h4 className={styles.label}>Rough timeframe?</h4>
                    <RadioGroup
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {[
                            "Next few months",
                            "In the next 6–12 months",
                            "Not defined"
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

                {/* Marketing Consent */}
                <div>
                    <FormControlLabel
                        control={<Checkbox />}
                        label={<span className="text-neutral-300 font-normal">Yes, send me upcoming exclusive deals & updates</span>}
                    />
                </div>

                {/* CTA Button and Trust Line */}
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
                        Let&apos;s Make It Happen
                    </Button>
                    <p className="text-center md:text-right text-neutral-500 text-sm max-w-md">
                        No pressure, no payment yet. Our team reviews and gets back to you within 24 hours with a tailored play.
                    </p>
                </div>

            </form>
        </ThemeProvider>
    )
}
