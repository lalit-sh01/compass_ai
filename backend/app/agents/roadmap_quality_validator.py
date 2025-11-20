
def validate_roadmap_quality(roadmap: dict) -> dict:
    issues = []
    total_topics = 0
    topics_with_enough_resources = 0
    total_resources = 0
    resources_with_urls = 0
    total_deliverables = 0

    # Validate each phase and week
    phases = roadmap.get("phases", [])
    for phase in phases:
        weeks = phase.get("weeks", [])
        for week in weeks:
            # Validate build section deliverables
            build_section = week.get("buildSection", {})
            deliverables = build_section.get("deliverables", [])
            if deliverables:
                total_deliverables += len(deliverables)
                if len(deliverables) < 3:
                    issues.append(f"Week {week.get('weekNumber')}: Build section has only {len(deliverables)} deliverable(s). Recommend 3-5 specific deliverables.")
            else:
                issues.append(f"Week {week.get('weekNumber')}: Build section missing deliverables.")

            # Validate research section
            research_section = week.get("researchSection", {})
            deep_dive_topics = research_section.get("deepDiveTopics", [])
            if deep_dive_topics:
                for i, topic in enumerate(deep_dive_topics):
                    total_topics += 1
                    suggested_resources = topic.get("suggestedResources", [])
                    resource_count = len(suggested_resources)
                    total_resources += resource_count

                    if resource_count >= 2:
                        topics_with_enough_resources += 1
                    else:
                        issues.append(f"Week {week.get('weekNumber')}, Topic {i + 1}: Only {resource_count} resource(s). Need 2-5 resources per topic.")

                    # Check URL presence
                    url_count = sum(1 for r in suggested_resources if r.get("url", "").startswith("http"))
                    resources_with_urls += url_count

                    if url_count < resource_count:
                        issues.append(f"Week {week.get('weekNumber')}, Topic {i + 1}: {resource_count - url_count} resource(s) missing URLs.")

                    # Check subtasks
                    subtasks = topic.get("subtasks", [])
                    if not subtasks:
                        issues.append(f"Week {week.get('weekNumber')}, Topic {i + 1}: No subtasks defined. Consider adding 2-4 subtasks.")
                    
                    # Validate subtask resources
                    for j, subtask in enumerate(subtasks):
                        sub_resources = subtask.get("suggestedResources", [])
                        if sub_resources:
                            sub_res_count = len(sub_resources)
                            total_resources += sub_res_count
                            sub_url_count = sum(1 for r in sub_resources if r.get("url", "").startswith("http"))
                            resources_with_urls += sub_url_count
                            
                            if sub_url_count < sub_res_count:
                                issues.append(f"Week {week.get('weekNumber')}, Topic {i + 1}, Subtask {j + 1}: {sub_res_count - sub_url_count} resource(s) missing URLs.")

            else:
                issues.append(f"Week {week.get('weekNumber')}: Research section missing deep dive topics.")

            # Validate share section
            share_section = week.get("shareSection", {})
            if not share_section:
                issues.append(f"Week {week.get('weekNumber')}: Missing share section.")
            elif not share_section.get("artifactTitle"):
                issues.append(f"Week {week.get('weekNumber')}: Share section missing artifactTitle.")

    # Validate supplemental sections
    supplemental = roadmap.get("supplementalSections", {})
    has_supplemental_sections = bool(supplemental)
    
    if not has_supplemental_sections:
        issues.append("Missing supplementalSections")
    else:
        if not supplemental.get("interviewBank"):
            issues.append("Missing or empty interviewBank in supplemental sections.")
        if not supplemental.get("successMetrics"):
            issues.append("Missing or empty successMetrics in supplemental sections.")
        if not supplemental.get("masterResources"):
            issues.append("Missing or empty masterResources in supplemental sections.")

    # Calculate metrics
    url_coverage_percent = round((resources_with_urls / total_resources) * 100) if total_resources > 0 else 0
    
    total_weeks = sum(len(p.get("weeks", [])) for p in phases)
    average_deliverables_per_week = round(total_deliverables / total_weeks, 1) if total_weeks > 0 else 0

    # Calculate quality score
    score = 100
    
    resource_coverage_percent = (topics_with_enough_resources / total_topics) * 100 if total_topics > 0 else 0
    score -= min(30, (100 - resource_coverage_percent) * 0.3)
    
    score -= min(30, (100 - url_coverage_percent) * 0.3)
    
    if average_deliverables_per_week < 3:
        score -= (3 - average_deliverables_per_week) * 7
        
    if not has_supplemental_sections:
        score -= 20
        
    score = max(0, round(score))

    return {
        "valid": len(issues) == 0,
        "score": score,
        "issues": issues,
        "summary": {
            "totalTopics": total_topics,
            "topicsWithEnoughResources": topics_with_enough_resources,
            "resourcesWithUrls": f"{url_coverage_percent}% ({resources_with_urls}/{total_resources})",
            "averageDeliverablesPerWeek": average_deliverables_per_week,
            "totalResources": total_resources,
            "hasSupplementalSections": has_supplemental_sections
        }
    }
