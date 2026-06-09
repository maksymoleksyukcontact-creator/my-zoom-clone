import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Button } from "./ui/button";

interface MeetingModalProps {
    children?: React.ReactNode;
    handleClick: () => void;
    isOpen: boolean;
    onClose: () => void;
    title: string;
    buttonText: string;
    buttonIcon?: string;
    image?: string;
}

function MeetingModal({ children, handleClick, isOpen, onClose, title, buttonText, buttonIcon, image }: MeetingModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-dark-1 text-white flex-between flex-col px-6 py-6">
                {image && <Image width={72} height={72} src={image} alt="Meeting" />}
                <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                {children}
                <Button
                    onClick={handleClick}
                    className="text-lg bg-blue-1 py-4
                    w-full
                    rounded-sm cursor-pointer">
                    {buttonIcon && <Image width={13} height={13} src={buttonIcon} alt="Button Icon" />}
                    {buttonText || "Start Meeting"}
                </Button>
            </DialogContent>
        </Dialog>)
}

export default MeetingModal