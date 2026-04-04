#!/usr/bin/env node

/**
 * SEO Validation Script
 * Validates that all pages have proper SEO elements
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const distDir = "./dist";
const siteUrl = "https://avaabrazzaq.com";

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  reset: "\x1b[0m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function findHtmlFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file === "index.html") {
      fileList.push(filePath);
    }
  }

  return fileList;
}

function validateHtmlFile(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const relativePath = filePath.replace(distDir, "").replace("/index.html", "/");
  const issues = [];
  const warnings = [];

  // Check for title tag
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) {
    issues.push("Missing <title> tag");
  } else if (titleMatch[1].length < 30 || titleMatch[1].length > 60) {
    warnings.push(
      `Title length ${titleMatch[1].length} chars (recommended: 30-60)`,
    );
  }

  // Check for meta description
  const descMatch = content.match(
    /<meta name="description" content="([^"]+)"/,
  );
  if (!descMatch) {
    issues.push("Missing meta description");
  } else if (descMatch[1].length < 120 || descMatch[1].length > 160) {
    warnings.push(
      `Description length ${descMatch[1].length} chars (recommended: 120-160)`,
    );
  }

  // Check for canonical URL
  if (!content.includes('<link rel="canonical"')) {
    issues.push("Missing canonical URL");
  }

  // Check for Open Graph tags
  if (!content.includes('property="og:title"')) {
    issues.push("Missing og:title");
  }
  if (!content.includes('property="og:description"')) {
    issues.push("Missing og:description");
  }
  if (!content.includes('property="og:image"')) {
    issues.push("Missing og:image");
  }

  // Check for robots meta tag
  if (
    !content.includes('name="robots"') &&
    !content.includes("name='robots'")
  ) {
    warnings.push("Missing robots meta tag");
  }

  // Check for structured data
  if (!content.includes('type="application/ld+json"')) {
    warnings.push("Missing structured data (JSON-LD)");
  }

  // Check for h1 tag
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (!h1Match) {
    issues.push("Missing <h1> tag");
  }

  return { relativePath, issues, warnings };
}

function validateSitemap() {
  log("\n📄 Validating Sitemap...", "blue");

  try {
    const sitemapPath = join(distDir, "sitemap-0.xml");
    const sitemap = readFileSync(sitemapPath, "utf-8");

    // Check for required elements
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    const priorityCount = (sitemap.match(/<priority>/g) || []).length;
    const changefreqCount = (sitemap.match(/<changefreq>/g) || []).length;

    log(`✓ Sitemap contains ${urlCount} URLs`, "green");

    if (priorityCount === urlCount) {
      log(`✓ All URLs have priority tags`, "green");
    } else {
      log(
        `⚠ Only ${priorityCount}/${urlCount} URLs have priority tags`,
        "yellow",
      );
    }

    if (changefreqCount === urlCount) {
      log(`✓ All URLs have changefreq tags`, "green");
    } else {
      log(
        `⚠ Only ${changefreqCount}/${urlCount} URLs have changefreq tags`,
        "yellow",
      );
    }

    // Verify sitemap-index.xml exists
    const sitemapIndexPath = join(distDir, "sitemap-index.xml");
    readFileSync(sitemapIndexPath, "utf-8");
    log("✓ sitemap-index.xml exists", "green");
  } catch (error) {
    log(`✗ Sitemap validation failed: ${error.message}`, "red");
  }
}

function validateRobotsTxt() {
  log("\n🤖 Validating robots.txt...", "blue");

  try {
    const robotsPath = join(distDir, "robots.txt");
    const robots = readFileSync(robotsPath, "utf-8");

    const requiredBots = [
      "GPTBot",
      "Claude-Web",
      "PerplexityBot",
      "Google-Extended",
      "Googlebot",
      "Bingbot",
    ];

    for (const bot of requiredBots) {
      if (robots.includes(bot)) {
        log(`✓ ${bot} configured`, "green");
      } else {
        log(`⚠ ${bot} not found in robots.txt`, "yellow");
      }
    }

    if (robots.includes("Sitemap:")) {
      log("✓ Sitemap reference found", "green");
    } else {
      log("⚠ Sitemap reference missing", "yellow");
    }
  } catch (error) {
    log(`✗ robots.txt validation failed: ${error.message}`, "red");
  }
}

function validateLlmsTxt() {
  log("\n🤖 Validating llms.txt...", "blue");

  try {
    const llmsPath = join(distDir, "llms.txt");
    const llms = readFileSync(llmsPath, "utf-8");

    if (llms.length > 1000) {
      log(`✓ llms.txt exists with ${llms.length} characters`, "green");
    } else {
      log(`⚠ llms.txt seems short (${llms.length} chars)`, "yellow");
    }

    const requiredSections = ["Services", "Contact", "Blog", "Keywords"];
    for (const section of requiredSections) {
      if (llms.includes(section)) {
        log(`✓ Contains ${section} section`, "green");
      } else {
        log(`⚠ Missing ${section} section`, "yellow");
      }
    }
  } catch (error) {
    log(`✗ llms.txt validation failed: ${error.message}`, "red");
  }
}

function main() {
  log("🔍 Starting SEO Validation", "blue");
  log("=".repeat(50), "blue");

  // Validate sitemap
  validateSitemap();

  // Validate robots.txt
  validateRobotsTxt();

  // Validate llms.txt
  validateLlmsTxt();

  // Find and validate all HTML files
  log("\n📝 Validating HTML pages...", "blue");
  const htmlFiles = findHtmlFiles(distDir);
  log(`Found ${htmlFiles.length} HTML pages\n`, "blue");

  let totalIssues = 0;
  let totalWarnings = 0;
  const pagesWithIssues = [];

  for (const file of htmlFiles) {
    const result = validateHtmlFile(file);

    if (result.issues.length > 0 || result.warnings.length > 0) {
      log(`\n${result.relativePath}`, "yellow");

      if (result.issues.length > 0) {
        log(`  Issues (${result.issues.length}):`, "red");
        for (const issue of result.issues) {
          log(`    ✗ ${issue}`, "red");
          totalIssues++;
        }
        pagesWithIssues.push(result.relativePath);
      }

      if (result.warnings.length > 0) {
        log(`  Warnings (${result.warnings.length}):`, "yellow");
        for (const warning of result.warnings) {
          log(`    ⚠ ${warning}`, "yellow");
          totalWarnings++;
        }
      }
    }
  }

  // Summary
  log("\n" + "=".repeat(50), "blue");
  log("📊 Summary", "blue");
  log("=".repeat(50), "blue");
  log(`Total pages validated: ${htmlFiles.length}`, "blue");
  log(`Pages with issues: ${pagesWithIssues.length}`, "yellow");
  log(`Total issues: ${totalIssues}`, totalIssues > 0 ? "red" : "green");
  log(`Total warnings: ${totalWarnings}`, totalWarnings > 0 ? "yellow" : "green");

  if (totalIssues === 0 && totalWarnings === 0) {
    log("\n✅ All pages pass SEO validation!", "green");
  } else if (totalIssues === 0) {
    log("\n✅ No critical issues found, only warnings", "green");
  } else {
    log("\n⚠️  Some pages need attention", "yellow");
  }

  process.exit(totalIssues > 0 ? 1 : 0);
}

main();
