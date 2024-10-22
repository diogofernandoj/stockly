"use client";

import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import SidebarContent from "./sidebar";

const SidebarSheetButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="w-max lg:hidden">
        <Button size="sm">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-max" side="left">
        <SheetTitle className="text-2xl font-bold text-emerald-500">
          STOCKLY
        </SheetTitle>
        <SheetDescription>Estoque com segurança.</SheetDescription>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarSheetButton;
