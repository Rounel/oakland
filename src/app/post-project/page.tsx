import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function PostProjectPage() {
  return (
    <div className="container max-w-3xl py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post a Project</h1>
        <p className="text-muted-foreground">Share the details of your project and find the perfect freelancer</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Provide information about your project to help providers understand your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" placeholder="E.g., Website Redesign for E-commerce Store" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tech & Development</SelectItem>
                <SelectItem value="design">Design & Graphics</SelectItem>
                <SelectItem value="marketing">Marketing & Communication</SelectItem>
                <SelectItem value="writing">Writing & Translation</SelectItem>
                <SelectItem value="audio">Audio & Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project in detail, including goals, requirements, and any specific skills needed."
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="micro">Less than $100</SelectItem>
                  <SelectItem value="small">$100 - $500</SelectItem>
                  <SelectItem value="medium">$500 - $1,000</SelectItem>
                  <SelectItem value="large">$1,000 - $5,000</SelectItem>
                  <SelectItem value="xlarge">$5,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Attachments (Optional)</Label>
            <div className="rounded-md border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center gap-1">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </div>
                <div className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (max 10MB)</div>
                <Input id="attachments" type="file" className="hidden" />
                <Button variant="outline" size="sm" className="mt-2">
                  Select Files
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Additional Options</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="featured" />
              <Label htmlFor="featured" className="text-sm font-normal">
                Feature this project (additional fee applies)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nda" />
              <Label htmlFor="nda" className="text-sm font-normal">
                Require providers to sign an NDA before viewing details
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Post Project</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

