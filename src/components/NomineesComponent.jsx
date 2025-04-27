"use client"

import { Checkbox } from "@/components/ui/checkbox"

const NomineesComponent = () => {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox/>
            <div className="leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
        
    )
}

export default NomineesComponent;