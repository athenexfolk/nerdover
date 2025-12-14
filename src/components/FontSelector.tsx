'use client';

import { CaseSensitiveIcon } from 'lucide-react';

import { useFont } from '@/contexts/FontContext';
import { fonts } from '@/core/constants/fonts';

import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function FontSelector() {
    const { font, setFont } = useFont();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <CaseSensitiveIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>แบบอักษร</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={font} onValueChange={setFont}>
                    {Object.entries(fonts).map(([key, { name }]) => (
                        <DropdownMenuRadioItem key={key} value={key}>
                            {name}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
