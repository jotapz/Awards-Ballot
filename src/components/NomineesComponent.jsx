"use client"

import { Checkbox } from "@/components/ui/checkbox"

const NomineesComponent = ({ nominees }) => {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox/>
            <div className="leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {nominees.name}
                </label>
                <p className="text-sm text-muted-foreground">
                    {nominees.description}
                </p>
            </div>
        </div>
        
    )
}

export default NomineesComponent;