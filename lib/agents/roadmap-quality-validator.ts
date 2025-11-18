import type { Roadmap } from '../types'

export interface QualityValidationResult {
  valid: boolean
  score: number // 0-100
  issues: string[]
  summary: {
    totalTopics: number
    topicsWithEnoughResources: number
    resourcesWithUrls: string
    averageDeliverablesPerWeek: number
    totalResources: number
    hasSupplementalSections: boolean
  }
}

/**
 * Validates the quality of a generated roadmap against gold standard metrics
 * @param roadmap - The roadmap to validate
 * @returns Detailed quality validation result
 */
export function validateRoadmapQuality(
  roadmap: Roadmap
): QualityValidationResult {
  const issues: string[] = []
  let totalTopics = 0
  let topicsWithEnoughResources = 0
  let totalResources = 0
  let resourcesWithUrls = 0
  let totalDeliverables = 0

  // Validate each phase and week
  roadmap.phases.forEach((phase) => {
    phase.weeks.forEach((week) => {
      // Validate build section deliverables
      if (week.buildSection?.deliverables) {
        totalDeliverables += week.buildSection.deliverables.length
        if (week.buildSection.deliverables.length < 3) {
          issues.push(
            `Week ${week.weekNumber}: Build section has only ${week.buildSection.deliverables.length} deliverable(s). Recommend 3-5 specific deliverables.`
          )
        }
      } else {
        issues.push(
          `Week ${week.weekNumber}: Build section missing deliverables.`
        )
      }

      // Validate research section
      if (week.researchSection?.deepDiveTopics) {
        week.researchSection.deepDiveTopics.forEach((topic, topicIndex) => {
          totalTopics++

          const resourceCount = topic.suggestedResources?.length || 0
          totalResources += resourceCount

          // Check resource count
          if (resourceCount >= 2) {
            topicsWithEnoughResources++
          } else {
            issues.push(
              `Week ${week.weekNumber}, Topic ${topicIndex + 1} ("${topic.description.substring(0, 50)}..."): Only ${resourceCount} resource(s). Need 2-5 resources per topic.`
            )
          }

          // Check URL presence
          if (topic.suggestedResources) {
            const urlCount = topic.suggestedResources.filter(
              (r) => r.url && r.url.startsWith('http')
            ).length
            resourcesWithUrls += urlCount

            if (urlCount < resourceCount) {
              issues.push(
                `Week ${week.weekNumber}, Topic ${topicIndex + 1}: ${resourceCount - urlCount} resource(s) missing URLs. All resources must have working URLs.`
              )
            }
          }

          // Check for subtasks (recommended but not required)
          if (!topic.subtasks || topic.subtasks.length === 0) {
            // This is a soft warning - don't count against score heavily
            issues.push(
              `Week ${week.weekNumber}, Topic ${topicIndex + 1}: No subtasks defined. Consider adding 2-4 subtasks for depth.`
            )
          }

          // Validate subtask resources
          if (topic.subtasks) {
            topic.subtasks.forEach((subtask, subtaskIndex) => {
              if (subtask.suggestedResources) {
                const subtaskResourceCount = subtask.suggestedResources.length
                totalResources += subtaskResourceCount

                const subtaskUrlCount = subtask.suggestedResources.filter(
                  (r) => r.url && r.url.startsWith('http')
                ).length
                resourcesWithUrls += subtaskUrlCount

                if (subtaskUrlCount < subtaskResourceCount) {
                  issues.push(
                    `Week ${week.weekNumber}, Topic ${topicIndex + 1}, Subtask ${subtaskIndex + 1}: ${subtaskResourceCount - subtaskUrlCount} resource(s) missing URLs.`
                  )
                }
              }
            })
          }
        })
      } else {
        issues.push(
          `Week ${week.weekNumber}: Research section missing deep dive topics.`
        )
      }

      // Validate share section
      if (!week.shareSection) {
        issues.push(`Week ${week.weekNumber}: Missing share section.`)
      } else if (!week.shareSection.artifactTitle) {
        issues.push(
          `Week ${week.weekNumber}: Share section missing artifactTitle.`
        )
      }
    })
  })

  // Validate supplemental sections
  const hasSupplementalSections = !!(roadmap as any).supplementalSections
  if (!hasSupplementalSections) {
    issues.push(
      'Missing supplementalSections (successMetrics, interviewBank, masterResources, etc.)'
    )
  } else {
    const supplemental = (roadmap as any).supplementalSections

    // Check for key supplemental sections
    if (!supplemental.interviewBank || supplemental.interviewBank.length === 0) {
      issues.push('Missing or empty interviewBank in supplemental sections.')
    }

    if (
      !supplemental.successMetrics ||
      supplemental.successMetrics.length === 0
    ) {
      issues.push('Missing or empty successMetrics in supplemental sections.')
    }

    if (
      !supplemental.masterResources ||
      supplemental.masterResources.length === 0
    ) {
      issues.push('Missing or empty masterResources in supplemental sections.')
    }
  }

  // Calculate metrics
  const urlCoveragePercent =
    totalResources > 0
      ? Math.round((resourcesWithUrls / totalResources) * 100)
      : 0
  const averageDeliverablesPerWeek =
    roadmap.phases.reduce((sum, p) => sum + p.weeks.length, 0) > 0
      ? Math.round(
          (totalDeliverables /
            roadmap.phases.reduce((sum, p) => sum + p.weeks.length, 0)) *
            10
        ) / 10
      : 0

  // Calculate quality score (0-100)
  let score = 100

  // Deduct points for missing resources (up to -30 points)
  const resourceCoveragePercent =
    totalTopics > 0 ? (topicsWithEnoughResources / totalTopics) * 100 : 0
  score -= Math.min(30, (100 - resourceCoveragePercent) * 0.3)

  // Deduct points for missing URLs (up to -30 points)
  score -= Math.min(30, (100 - urlCoveragePercent) * 0.3)

  // Deduct points for low deliverables (up to -20 points)
  if (averageDeliverablesPerWeek < 3) {
    score -= (3 - averageDeliverablesPerWeek) * 7
  }

  // Deduct points for missing supplemental sections (up to -20 points)
  if (!hasSupplementalSections) {
    score -= 20
  }

  score = Math.max(0, Math.round(score))

  return {
    valid: issues.length === 0,
    score,
    issues,
    summary: {
      totalTopics,
      topicsWithEnoughResources,
      resourcesWithUrls: `${urlCoveragePercent}% (${resourcesWithUrls}/${totalResources})`,
      averageDeliverablesPerWeek,
      totalResources,
      hasSupplementalSections,
    },
  }
}

/**
 * Logs quality validation results in a readable format
 */
export function logQualityValidation(result: QualityValidationResult): void {
  console.log('\n========== ROADMAP QUALITY VALIDATION ==========')
  console.log(`Score: ${result.score}/100`)
  console.log(`Valid: ${result.valid ? '✓ YES' : '✗ NO'}`)
  console.log('\n--- Summary ---')
  console.log(`Total Topics: ${result.summary.totalTopics}`)
  console.log(
    `Topics with 2+ Resources: ${result.summary.topicsWithEnoughResources}/${result.summary.totalTopics}`
  )
  console.log(`URL Coverage: ${result.summary.resourcesWithUrls}`)
  console.log(
    `Average Deliverables per Week: ${result.summary.averageDeliverablesPerWeek}`
  )
  console.log(`Total Resources: ${result.summary.totalResources}`)
  console.log(
    `Has Supplemental Sections: ${result.summary.hasSupplementalSections ? 'Yes' : 'No'}`
  )

  if (result.issues.length > 0) {
    console.log(`\n--- Issues (${result.issues.length}) ---`)
    result.issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`)
    })
  } else {
    console.log('\n✓ No quality issues found!')
  }

  console.log('================================================\n')
}
