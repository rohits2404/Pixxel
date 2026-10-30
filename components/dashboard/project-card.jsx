import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Edit, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { api } from "@/convex/_generated/api";

export function ProjectCard({ project, onEdit }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const { mutate: deleteProject, isLoading } = useConvexMutation(
        api.projects.deleteProject,
    );

    const lastUpdated = formatDistanceToNow(new Date(project.updatedAt), {
        addSuffix: true,
    });

    const handleDelete = async () => {
        try {
            await deleteProject({ projectId: project._id });

            toast.success("Project Deleted Successfully");
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Error Deleting Project:", error);
            toast.error("Failed To Delete Project. Please Try Again.");
        }
    };

    return (
        <>
            <Card className="py-0 group relative bg-slate-800/50 overflow-hidden hover:border-white/20 transition-all hover:scale-[1.02]">
                {/* Thumbnail */}
                <div className="aspect-video bg-slate-700 relative overflow-hidden">
                    {project.thumbnailUrl && (
                        <img
                            src={project.thumbnailUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            variant="glass"
                            size="sm"
                            onClick={onEdit}
                            className="gap-2"
                        >
                            <Edit className="h-4 w-4" />
                            Edit
                        </Button>

                        <Button
                            variant="glass"
                            size="sm"
                            onClick={() => setDeleteDialogOpen(true)}
                            className="gap-2 text-red-400 hover:text-red-300"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                {/* Project Info */}
                <CardContent className="pb-6">
                    <h3 className="font-semibold text-white mb-1 truncate">
                        {project.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-white/70">
                        <span>Updated {lastUpdated}</span>

                        <Badge
                            variant="secondary"
                            className="text-xs bg-slate-700 text-white/70"
                        >
                            {project.width} × {project.height}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Modal */}
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                    if (!isLoading) {
                        setDeleteDialogOpen(open);
                    }
                }}
            >
                <AlertDialogContent className="bg-slate-900 border border-white/10 text-white sm:max-w-md">
                    <AlertDialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-11 w-11 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                            </div>

                            <AlertDialogTitle className="text-lg font-semibold text-white">
                                Delete Project?
                            </AlertDialogTitle>
                        </div>

                        <AlertDialogDescription className="text-slate-400 leading-relaxed">
                            Are You Sure You Want To Delete{" "}
                            <span className="font-semibold text-white">
                                "{project.title}"
                            </span>
                            ? This Action Cannot Be Undone. All Project Data
                            Associated With This Project May Be Permanently
                            Lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="gap-2 sm:gap-2">
                        <AlertDialogCancel
                            disabled={isLoading}
                            className="bg-slate-800 border-white/10 text-white hover:bg-slate-700 hover:text-white"
                        >
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={(event) => {
                                event.preventDefault();
                                handleDelete();
                            }}
                            disabled={isLoading}
                            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Project
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
