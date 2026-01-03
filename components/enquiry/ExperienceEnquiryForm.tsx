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
    Slider,
    Typography
} from '@mui/material'

// Custom Theme for Dark Mode + Gold Accents
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
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#D4AF37',
                }
            }
        }
    },
})

const styles = {
    label: "text-lg font-normal text-white mb-4 block",
    subLabel: "text-neutral-500 text-sm font-normal ml-2"
}

export default function ExperienceEnquiryForm() {
    const [travellers, setTravellers] = useState<string>('Just me')
    const [vibe, setVibe] = useState<string>('')
    const [adults, setAdults] = useState<number>(1)
    const [kids, setKids] = useState<number>(0)

    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* Who's joining? */}
                <div>
                    <h4 className={styles.label}>
                        Who&apos;s joining the experience?
                        <span className={styles.subLabel}>(Select)</span>
                    </h4>
                    <RadioGroup
                        value={travellers}
                        onChange={(e) => setTravellers(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {["Just me", "Couple", "Family", "Friends / team"].map((item) => (
                            <FormControlLabel
                                key={item}
                                value={item}
                                control={<Radio />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* Departure City */}
                <div>
                    <TextField fullWidth label="Your departure city (City, country)" variant="outlined" />
                </div>

                {/* Total Travellers */}
                <div>
                    <h4 className={styles.label}>Total travellers?</h4>
                    <Box sx={{ width: '100%', maxWidth: 400, pl: 1, pr: 2 }}>
                        <Typography gutterBottom className="text-neutral-300">Adults: {adults}</Typography>
                        <Slider
                            value={adults}
                            onChange={(_, val) => setAdults(val as number)}
                            min={1}
                            max={20}
                            valueLabelDisplay="auto"
                            marks
                            step={1}
                        />
                        <Typography gutterBottom className="text-neutral-300 mt-4">Kids (if any): {kids}</Typography>
                        <Slider
                            value={kids}
                            onChange={(_, val) => setKids(val as number)}
                            min={0}
                            max={10}
                            valueLabelDisplay="auto"
                            marks
                            step={1}
                        />
                    </Box>
                </div>

                {/* Your Vibe */}
                <div>
                    <h4 className={styles.label}>
                        Your vibe?
                        <span className={styles.subLabel}>(Choose your comfort level)</span>
                    </h4>
                    <RadioGroup
                        value={vibe}
                        onChange={(e) => setVibe(e.target.value)}
                        className="flex flex-col gap-2"
                    >
                        {[
                            { val: "Smart & Good Value", desc: "great seats, no fuss" },
                            { val: "Premium", desc: "comfort, location, and touches that feel special" },
                            { val: "VIP", desc: "hospitality, exclusive access, top-tier everything" }
                        ].map((item) => (
                            <FormControlLabel
                                key={item.val}
                                value={item.val}
                                control={<Radio />}
                                label={
                                    <span className="text-neutral-300 font-normal">
                                        <span className="text-white font-medium">{item.val}</span> – {item.desc}
                                    </span>
                                }
                            />
                        ))}
                    </RadioGroup>
                </div>

                {/* What matters most */}
                <div>
                    <h4 className={styles.label}>
                        What matters most?
                        <span className={styles.subLabel}>(Pick up to 3)</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                        {[
                            "Best seats in the house",
                            "Stress-free, handled-for-you travel",
                            "Epic hotel + location",
                            "Local experience & culture",
                            "Making it a celebration day"
                        ].map((item) => (
                            <FormControlLabel
                                key={item}
                                control={<Checkbox />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </div>
                </div>

                {/* Special Requests */}
                <div>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Any special requests? (e.g., celebration, family trip, first big match, accessibility needs)"
                        variant="outlined"
                    />
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className={styles.label}>How can we reach you?</h4>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '2rem' }}>
                        <TextField fullWidth label="Name" variant="outlined" />
                        <TextField fullWidth label="Email" variant="outlined" />
                        <TextField fullWidth label="WhatsApp / Phone" variant="outlined" className="md:col-span-2" />
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
                        Create My Experience
                    </Button>
                    <p className="text-center md:text-right text-neutral-500 text-sm max-w-md">
                        We send you a custom plan with transparent pricing first. Zero booking pressure. You choose what feels right.
                    </p>
                </div>
            </form>
        </ThemeProvider>
    )
}
