"use client"

import * as React from "react"
import { FaFilter } from "react-icons/fa6";



import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"



export function DrawerDemo({children,open, setOpen, button}:{button:any,children: React.ReactNode}) {
  



  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-end" asChild>
       {button ? button :<Button onClick={()=>setOpen(true)} variant="outline" className="flex gap-2 w-full text-primary items-center">
        <FaFilter className="text-primary" />
        <span>Filters</span>
        </Button>} 
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm">
         
          {children}
          <DrawerFooter>
            
           
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
