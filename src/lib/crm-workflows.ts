// CRM Workflows for automated lead management

export interface WorkflowTrigger {
  type: 'contact_created' | 'lead_score_updated' | 'tag_added' | 'email_opened' | 'course_enrolled' | 'quiz_completed'
  conditions?: {
    field: string
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in' | 'not_in'
    value: any
  }[]
}

export interface WorkflowAction {
  type: 'add_tag' | 'remove_tag' | 'send_email' | 'create_task' | 'update_lead_score' | 'assign_owner' | 'create_deal' | 'notify_team'
  config: Record<string, any>
  delay?: number // milliseconds
}

export interface Workflow {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
  createdAt: Date
  updatedAt: Date
  executionCount: number
  lastExecuted?: Date
}

// Predefined workflows for The Purple Wings
export const PREDEFINED_WORKFLOWS: Omit<Workflow, 'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'executionCount' | 'lastExecuted'>[] = [
  {
    name: 'New Lead Welcome Series',
    description: 'Send welcome emails and create follow-up tasks for new leads',
    trigger: {
      type: 'contact_created',
      conditions: [
        { field: 'tags', operator: 'contains', value: 'newsletter-subscriber' }
      ]
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['new-lead', 'welcome-sequence'] }
      },
      {
        type: 'send_email',
        config: { 
          template: 'welcome-email-1',
          delay: 0 
        }
      },
      {
        type: 'create_task',
        config: {
          title: 'Follow up with new lead',
          description: 'Personal welcome call or email',
          priority: 'medium',
          dueDate: 24 * 60 * 60 * 1000,
          assignTo: 'lead-team'
        },
        delay: 60 * 60 * 1000
      },
      {
        type: 'send_email',
        config: { 
          template: 'welcome-email-2',
          delay: 24 * 60 * 60 * 1000
        }
      },
      {
        type: 'send_email',
        config: { 
          template: 'welcome-email-3',
          delay: 3 * 24 * 60 * 60 * 1000
        }
      }
    ]
  },
  {
    name: 'High-Value Lead Alert',
    description: 'Notify team when high-value lead is identified',
    trigger: {
      type: 'lead_score_updated',
      conditions: [
        { field: 'grade', operator: 'equals', value: 'A' },
        { field: 'category', operator: 'equals', value: 'Hot' }
      ]
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['high-value-lead', 'priority-follow-up'] }
      },
      {
        type: 'create_deal',
        config: {
          title: 'High-Value Lead - Immediate Follow-up',
          description: 'Hot lead requiring immediate attention',
          stage: 'LEAD',
          priority: 'high',
          valueCents: 100000 // $1000 potential value
        }
      },
      {
        type: 'assign_owner',
        config: { assignTo: 'sales-team-lead' }
      },
      {
        type: 'notify_team',
        config: {
          message: 'New high-value lead detected! Immediate follow-up recommended.',
          channels: ['email', 'slack'],
          recipients: ['sales-team', 'marketing-team']
        }
      }
    ]
  },
  {
    name: 'Quiz Completion Nurturing',
    description: 'Send targeted content based on quiz results',
    trigger: {
      type: 'quiz_completed',
      conditions: [
        { field: 'quizType', operator: 'equals', value: 'personality' }
      ]
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['quiz-completed', 'personality-quiz'] }
      },
      {
        type: 'send_email',
        config: { 
          template: 'quiz-results-personality',
          delay: 0 
        }
      },
      {
        type: 'update_lead_score',
        config: { points: 10 },
        delay: 0
      },
      {
        type: 'send_email',
        config: { 
          template: 'course-recommendation',
          delay: 2 * 24 * 60 * 60 * 1000 // 2 days
        }
      }
    ]
  },
  {
    name: 'Course Enrollment Follow-up',
    description: 'Track and nurture course enrollments',
    trigger: {
      type: 'course_enrolled',
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['course-enrolled', 'active-learner'] }
      },
      {
        type: 'update_lead_score',
        config: { points: 25 }
      },
      {
        type: 'send_email',
        config: { 
          template: 'course-welcome',
          delay: 0 
        }
      },
      {
        type: 'create_task',
        config: {
          title: 'Check course progress',
          description: 'Monitor student progress and offer help',
          priority: 'low',
          dueDate: 7 * 24 * 60 * 60 * 1000, // 7 days
          assignTo: 'education-team'
        }
      }
    ]
  },
  {
    name: 'Inactive Lead Re-engagement',
    description: 'Re-engage leads that haven\'t been active',
    trigger: {
      type: 'lead_score_updated',
      conditions: [
        { field: 'daysSinceLastActivity', operator: 'greater_than', value: 90 },
        { field: 'category', operator: 'in', value: ['Cool', 'Cold'] }
      ]
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['inactive-lead', 're-engagement-campaign'] }
      },
      {
        type: 'send_email',
        config: { 
          template: 're-engagement-offer',
          delay: 0 
        }
      },
      {
        type: 'create_task',
        config: {
          title: 'Contact inactive lead',
          description: 'Personal outreach to re-engage',
          priority: 'low',
          dueDate: 3 * 24 * 60 * 60 * 1000, // 3 days
          assignTo: 'lead-team'
        }
      }
    ]
  },
  {
    name: 'Local Massachusetts Priority',
    description: 'Prioritize local Massachusetts leads',
    trigger: {
      type: 'contact_created',
      conditions: [
        { field: 'location', operator: 'contains', value: 'MA' },
        { field: 'location', operator: 'contains', value: 'Massachusetts' }
      ]
    },
    actions: [
      {
        type: 'add_tag',
        config: { tags: ['local-lead', 'massachusetts'] }
      },
      {
        type: 'update_lead_score',
        config: { points: 15 }
      },
      {
        type: 'create_task',
        config: {
          title: 'Local lead follow-up',
          description: 'Prioritize local Massachusetts leads for events',
          priority: 'medium',
          dueDate: 48 * 60 * 60 * 1000, // 48 hours
          assignTo: 'local-events-team'
        }
      }
    ]
  }
]

// Workflow Engine
export class WorkflowEngine {
  private workflows: Map<string, Workflow> = new Map()
  private executionQueue: Array<{
    workflowId: string
    contactId: string
    triggerData: any
    timestamp: Date
  }> = []

  constructor() {
    this.initializeWorkflows()
  }

  private initializeWorkflows() {
    PREDEFINED_WORKFLOWS.forEach((workflowData, index) => {
      const workflow: Workflow = {
        ...workflowData,
        id: `workflow-${index + 1}`,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        executionCount: 0
      }
      this.workflows.set(workflow.id, workflow)
    })
  }

  // Trigger workflow execution
  async triggerWorkflows(triggerType: string, contactId: string, triggerData: any) {
    const matchingWorkflows = Array.from(this.workflows.values()).filter(
      workflow => 
        workflow.isActive && 
        workflow.trigger.type === triggerType &&
        this.evaluateConditions(workflow.trigger.conditions, triggerData)
    )

    for (const workflow of matchingWorkflows) {
      this.executionQueue.push({
        workflowId: workflow.id,
        contactId,
        triggerData,
        timestamp: new Date()
      })
    }

    // Process execution queue
    this.processExecutionQueue()
  }

  // Evaluate workflow conditions
  private evaluateConditions(conditions: any[] = [], triggerData: any): boolean {
    if (conditions.length === 0) return true

    return conditions.every(condition => {
      const fieldValue = this.getFieldValue(triggerData, condition.field)
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value
        case 'contains':
          return Array.isArray(fieldValue) 
            ? fieldValue.includes(condition.value)
            : String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase())
        case 'greater_than':
          return Number(fieldValue) > Number(condition.value)
        case 'less_than':
          return Number(fieldValue) < Number(condition.value)
        case 'in':
          return condition.value.includes(fieldValue)
        case 'not_in':
          return !condition.value.includes(fieldValue)
        default:
          return false
      }
    })
  }

  // Get nested field value
  private getFieldValue(obj: any, fieldPath: string): any {
    return fieldPath.split('.').reduce((current, key) => current?.[key], obj)
  }

  // Process execution queue
  private async processExecutionQueue() {
    while (this.executionQueue.length > 0) {
      const item = this.executionQueue.shift()!
      await this.executeWorkflow(item.workflowId, item.contactId, item.triggerData)
    }
  }

  // Execute workflow actions
  private async executeWorkflow(workflowId: string, contactId: string, triggerData: any) {
    const workflow = this.workflows.get(workflowId)
    if (!workflow) return

    try {
      // Execute actions with delays
      for (const action of workflow.actions) {
        if (action.delay) {
          setTimeout(() => {
            this.executeAction(action, contactId, triggerData)
          }, action.delay)
        } else {
          await this.executeAction(action, contactId, triggerData)
        }
      }

      // Update workflow stats
      workflow.executionCount++
      workflow.lastExecuted = new Date()
      workflow.updatedAt = new Date()

    } catch (error) {
      console.error(`Error executing workflow ${workflowId}:`, error)
    }
  }

  // Execute individual action
  private async executeAction(action: WorkflowAction, contactId: string, triggerData: any) {
    switch (action.type) {
      case 'add_tag':
        await this.addTags(contactId, action.config.tags)
        break
      
      case 'remove_tag':
        await this.removeTags(contactId, action.config.tags)
        break
      
      case 'send_email':
        await this.sendEmail(contactId, action.config.template, triggerData)
        break
      
      case 'create_task':
        await this.createTask(contactId, action.config)
        break
      
      case 'update_lead_score':
        await this.updateLeadScore(contactId, action.config.points)
        break
      
      case 'assign_owner':
        await this.assignOwner(contactId, action.config.assignTo)
        break
      
      case 'create_deal':
        await this.createDeal(contactId, action.config)
        break
      
      case 'notify_team':
        await this.notifyTeam(action.config)
        break
    }
  }

  // Action implementations
  private async addTags(contactId: string, tags: string[]) {
    try {
      const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tags: tags // This would merge with existing tags
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add tags')
      }
    } catch (error) {
      console.error('Error adding tags:', error)
    }
  }

  private async removeTags(contactId: string, tags: string[]) {
    // Implementation would fetch current tags, remove specified ones, and update
    console.log(`Removing tags ${tags.join(', ')} from contact ${contactId}`)
  }

  private async sendEmail(contactId: string, template: string, triggerData: any) {
    try {
      const response = await fetch(`${process.env.EMAIL_SERVICE_URL}/emails/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.EMAIL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template,
          contactId,
          variables: triggerData
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  private async createTask(contactId: string, config: any) {
    try {
      const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/tasks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId,
          ...config
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create task')
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  private async updateLeadScore(contactId: string, points: number) {
    // Implementation would fetch current lead score, add points, and update
    console.log(`Updating lead score for ${contactId} by ${points} points`)
  }

  private async assignOwner(contactId: string, assignTo: string) {
    try {
      const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignedTo: assignTo
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to assign owner')
      }
    } catch (error) {
      console.error('Error assigning owner:', error)
    }
  }

  private async createDeal(contactId: string, config: any) {
    try {
      const response = await fetch(`${process.env.JANAGANA_API_URL}/plugin/crm/deals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.JANAGANA_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactId,
          ...config
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create deal')
      }
    } catch (error) {
      console.error('Error creating deal:', error)
    }
  }

  private async notifyTeam(config: any) {
    // Implementation would send notifications via email, Slack, etc.
    console.log(`Notifying team: ${config.message}`)
  }

  // Workflow management methods
  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values())
  }

  getWorkflow(id: string): Workflow | null {
    return this.workflows.get(id) || null
  }

  activateWorkflow(id: string) {
    const workflow = this.workflows.get(id)
    if (workflow) {
      workflow.isActive = true
      workflow.updatedAt = new Date()
    }
  }

  deactivateWorkflow(id: string) {
    const workflow = this.workflows.get(id)
    if (workflow) {
      workflow.isActive = false
      workflow.updatedAt = new Date()
    }
  }
}

// Singleton instance
export const workflowEngine = new WorkflowEngine()
