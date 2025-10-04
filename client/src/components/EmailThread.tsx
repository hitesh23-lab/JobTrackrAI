import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Reply, Star, Clock } from "lucide-react";
import { useState } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isImportant: boolean;
}

interface EmailThreadProps {
  emails: Email[];
  jobTitle: string;
}

export function EmailThread({ emails, jobTitle }: EmailThreadProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Card data-testid="card-email-thread">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Email Communications</h3>
            <p className="text-sm text-muted-foreground">{jobTitle}</p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Mail className="h-3 w-3" />
            Gmail Synced
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {emails.map((email, index) => (
          <div key={email.id} className="relative">
            {index < emails.length - 1 && (
              <div className="absolute left-5 top-12 h-full w-px bg-border" />
            )}
            <div
              className={`border rounded-md p-4 hover-elevate cursor-pointer ${expandedId === email.id ? 'border-primary' : ''}`}
              onClick={() => setExpandedId(expandedId === email.id ? null : email.id)}
              data-testid={`email-item-${email.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm">{email.from}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">{email.timestamp}</span>
                      {email.isImportant && <Star className="h-4 w-4 fill-warning text-warning" />}
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{email.subject}</p>
                  {expandedId !== email.id ? (
                    <p className="text-sm text-muted-foreground line-clamp-2">{email.preview}</p>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <p className="text-sm">{email.content}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); console.log('Reply clicked'); }} data-testid={`button-reply-${email.id}`}>
                          <Reply className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => { e.stopPropagation(); console.log('Mark important clicked'); }}
                          data-testid={`button-mark-important-${email.id}`}
                        >
                          <Star className="h-4 w-4 mr-1" />
                          Mark Important
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
