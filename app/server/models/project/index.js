import mongoose from 'mongoose';
import { ProjectClass } from './project.class';
import projectSchema from './project.schema';

const ProjectSchema = new mongoose.Schema(projectSchema, { timestamps: true });

ProjectSchema.loadClass(ProjectClass);

delete mongoose.connection.models.Project;
export const Project = mongoose.model('Project', ProjectSchema);
