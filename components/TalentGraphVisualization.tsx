'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import { TalentGraphData, GraphNode, GraphLink } from '@/types'

interface Props {
  data: TalentGraphData;
  width?: number;
  height?: number;
}

type RichNode = GraphNode & {
  score?: number
  size?: number
  color?: string
  isCore?: boolean
  evidenceCount?: number
  description?: string
  rawType?: string
  targetX?: number
  targetY?: number
}

type RichLink = GraphLink & {
  sourceId: string
  targetId: string
  width: number
  color: string
  kind: 'core' | 'identity' | 'evidence'
}

const CATEGORY_META: Record<string, { color: string; label: string; angle: number }> = {
  产品: { color: '#38bdf8', label: '产品能力', angle: -150 },
  技术: { color: '#2dd4bf', label: '技术能力', angle: -28 },
  分析: { color: '#f59e0b', label: '分析能力', angle: 150 },
  协作: { color: '#fb7185', label: '协作能力', angle: 35 },
  管理: { color: '#22c55e', label: '管理能力', angle: 92 },
  工具: { color: '#818cf8', label: '工具能力', angle: -88 },
  其他: { color: '#94a3b8', label: '其他能力', angle: 180 }
}

const EVIDENCE_COLORS: Record<string, string> = {
  company: '#a78bfa',
  project: '#f472b6',
  education: '#34d399',
  certificate: '#fb923c',
  portfolio: '#2dd4bf'
}

function normalizeCategory(category?: string) {
  if (!category) return '其他'
  if (CATEGORY_META[category]) return category
  if (/产品|需求|用户|增长|运营|策划|设计/.test(category)) return '产品'
  if (/技术|开发|前端|后端|算法|工程/.test(category)) return '技术'
  if (/数据|分析|金融|量化|风控/.test(category)) return '分析'
  if (/协作|沟通|团队/.test(category)) return '协作'
  if (/管理|项目/.test(category)) return '管理'
  if (/工具|运维|部署/.test(category)) return '工具'
  return '其他'
}

function capabilityScore(cap: TalentGraphData['capabilities'][number]) {
  const strength = cap.strength ?? (cap.level === 'expert' ? 82 : cap.level === 'strong' ? 68 : cap.level === 'moderate' ? 48 : 30)
  const years = Math.min((cap.years ?? 1) / 6, 1) * 100
  const projects = Math.min((cap.projectCount ?? cap.evidenceIds.length) / 10, 1) * 100
  const evidence = Math.min(cap.evidenceIds.length / 3, 1) * 100
  const quality = ((cap.qualityScore ?? 6) / 10) * 100
  return Math.round(strength * 0.46 + years * 0.16 + projects * 0.14 + evidence * 0.12 + quality * 0.12)
}

function shortLabel(label: string, max = 7) {
  return label.length > max ? `${label.slice(0, max)}…` : label
}

export default function TalentGraphVisualization({ data, width = 800, height = 700 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<{ node: RichNode; capability?: typeof data.capabilities[0]; evidence?: typeof data.evidence[0] } | null>(null)

  const coreCapabilities = useMemo(() => {
    return [...data.capabilities]
      .map(cap => ({ cap, score: capabilityScore(cap) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }, [data.capabilities])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const centerX = width / 2
    const centerY = height / 2 + 8
    const clusterRadius = Math.min(width, height) * 0.34
    const evidenceRadius = Math.min(width, height) * 0.47
    const nodes: RichNode[] = []
    const links: RichLink[] = []

    const categoryAnchor = (category: string, radius = clusterRadius) => {
      const meta = CATEGORY_META[normalizeCategory(category)] || CATEGORY_META.其他
      const rad = (meta.angle / 180) * Math.PI
      return {
        x: centerX + Math.cos(rad) * radius,
        y: centerY + Math.sin(rad) * radius,
        meta
      }
    }

    const addNode = (node: RichNode) => {
      nodes.push({ ...node, targetX: node.x, targetY: node.y })
    }

    addNode({
      id: 'center',
      label: data.identity.name,
      layer: 'center',
      x: centerX,
      y: centerY,
      size: 46,
      score: 100,
      color: '#38bdf8',
      isCore: true
    })

    const identityItems = [
      { label: data.identity.role, category: '职位' },
      { label: data.identity.location, category: '城市' },
      { label: data.identity.totalExperienceYears ? `${data.identity.totalExperienceYears}年经验` : (data.identity.availability === 'looking' ? '积极求职' : data.identity.availability === 'open' ? '开放机会' : '暂不考虑'), category: data.identity.totalExperienceYears ? '经验' : '状态' }
    ]

    identityItems.forEach((item, index) => {
      const angle = (index / identityItems.length) * Math.PI * 2 - Math.PI / 2
      const radius = 98
      const nodeId = `identity-${index}`
      addNode({
        id: nodeId,
        label: item.label,
        layer: 'identity',
        category: item.category,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size: 25,
        score: 70,
        color: '#0ea5e9'
      })
      links.push({ source: 'center', target: nodeId, sourceId: 'center', targetId: nodeId, strength: 0.8, width: 2, color: '#0ea5e9', kind: 'identity' })
    })

    const categoryBuckets = new Map<string, typeof data.capabilities>()
    data.capabilities.forEach(cap => {
      const category = normalizeCategory(cap.category)
      categoryBuckets.set(category, [...(categoryBuckets.get(category) || []), cap])
    })

    const categoryScores = new Map<string, number>()
    data.capabilities.forEach(cap => {
      const category = normalizeCategory(cap.category)
      categoryScores.set(category, (categoryScores.get(category) || 0) + capabilityScore(cap))
    })

    categoryBuckets.forEach((caps, category) => {
      const anchor = categoryAnchor(category)
      const sortedCaps = caps.map(cap => ({ cap, score: capabilityScore(cap) })).sort((a, b) => b.score - a.score)
      sortedCaps.forEach(({ cap, score }, index) => {
        const perRing = 5
        const ring = Math.floor(index / perRing)
        const angle = ((index % perRing) / perRing) * Math.PI * 2 + ring * 0.55
        const localRadius = index === 0 ? 0 : 54 + ring * 58
        const x = anchor.x + Math.cos(angle) * localRadius
        const y = anchor.y + Math.sin(angle) * localRadius
        const size = 14 + (score / 100) * 22
        const isCore = coreCapabilities.some(item => item.cap.id === cap.id) || score >= 82

        addNode({
          id: cap.id,
          label: cap.name,
          layer: 'capability',
          category,
          level: cap.strength ?? score,
          score,
          size,
          color: anchor.meta.color,
          isCore,
          evidenceCount: cap.evidenceIds.length,
          description: cap.description,
          x,
          y
        })
        links.push({
          source: 'center',
          target: cap.id,
          sourceId: 'center',
          targetId: cap.id,
          strength: isCore ? Math.max(0.48, score / 100) : 0.18,
          width: isCore ? 1.4 + (score / 100) * 2.2 : 0.8,
          color: anchor.meta.color,
          kind: 'core'
        })
      })
    })

    data.evidence.forEach((evi, index) => {
      const supportedCaps = data.capabilities.filter(cap =>
        evi.capabilities.some(capName => cap.name === capName || capName.includes(cap.name) || cap.name.includes(capName))
      )
      const mainCap = supportedCaps[0]
      const anchor = mainCap ? categoryAnchor(mainCap.category, evidenceRadius) : { x: centerX, y: centerY + evidenceRadius, meta: CATEGORY_META.其他 }
      const impact = evi.impactScore ?? 5
      const fanIndex = index % 4
      const fanRing = Math.floor(index / 4)
      const angle = ((fanIndex / 4) * Math.PI * 2) + fanRing * 0.72
      const spread = 42 + fanRing * 48
      const size = 13 + impact * 1.4 + Math.min(evi.capabilities.length, 4) * 1.6

      addNode({
        id: evi.id,
        label: evi.title,
        layer: 'evidence',
        category: evi.type,
        rawType: evi.type,
        level: impact,
        score: impact * 10,
        size,
        color: EVIDENCE_COLORS[evi.type] || '#64748b',
        description: evi.description,
        x: anchor.x + Math.cos(angle) * spread,
        y: anchor.y + Math.sin(angle) * spread
      })

      if (supportedCaps.length === 0) {
        links.push({ source: 'center', target: evi.id, sourceId: 'center', targetId: evi.id, strength: 0.16, width: 0.8, color: '#64748b', kind: 'evidence' })
      }

      supportedCaps.forEach(cap => {
        const score = capabilityScore(cap)
        const linkStrength = Math.min(0.95, 0.25 + (impact / 10) * 0.24 + (score / 100) * 0.24)
        links.push({
          source: cap.id,
          target: evi.id,
          sourceId: cap.id,
          targetId: evi.id,
          strength: linkStrength,
          width: 0.8 + linkStrength * 2.4,
          color: categoryAnchor(cap.category).meta.color,
          kind: 'evidence'
        })
      })
    })

    nodes.forEach(node => {
      if (node.layer === 'center' || node.layer === 'identity') {
        ;(node as any).fx = node.x
        ;(node as any).fy = node.y
      }
    })

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('x', d3.forceX((d: any) => d.targetX).strength((d: any) => d.layer === 'capability' ? 0.25 : d.layer === 'evidence' ? 0.18 : 0.5))
      .force('y', d3.forceY((d: any) => d.targetY).strength((d: any) => d.layer === 'capability' ? 0.25 : d.layer === 'evidence' ? 0.18 : 0.5))
      .force('charge', d3.forceManyBody().strength((d: any) => d.layer === 'capability' ? -34 : d.layer === 'evidence' ? -20 : -8))
      .force('collision', d3.forceCollide().radius((d: any) => (d.size || 20) + (d.layer === 'capability' && (d.isCore || (d.score || 0) >= 78) ? 26 : 12)).iterations(3))
      .stop()

    for (let i = 0; i < 180; i++) simulation.tick()

    const nodeById = new Map(nodes.map(node => [node.id, node]))
    const defs = svg.append('defs')

    const centerGradient = defs.append('radialGradient').attr('id', 'centerGradient')
    centerGradient.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8')
    centerGradient.append('stop').attr('offset', '58%').attr('stop-color', '#0ea5e9')
    centerGradient.append('stop').attr('offset', '100%').attr('stop-color', '#d946ef')

    const glowFilter = defs.append('filter').attr('id', 'glow').attr('x', '-80%').attr('y', '-80%').attr('width', '260%').attr('height', '260%')
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur')
    const feMerge = glowFilter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    const background = svg.append('g').attr('opacity', 0.9)
    Array.from(categoryScores.entries()).forEach(([category, score]) => {
      const anchor = categoryAnchor(category)
      const intensity = Math.min(1, score / 360)
      const radius = 70 + intensity * 44
      background.append('circle')
        .attr('cx', anchor.x)
        .attr('cy', anchor.y)
        .attr('r', radius)
        .attr('fill', anchor.meta.color)
        .attr('fill-opacity', 0.035 + intensity * 0.055)
        .attr('stroke', anchor.meta.color)
        .attr('stroke-opacity', 0.10 + intensity * 0.12)
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '7,11')
      background.append('text')
        .attr('x', anchor.x)
        .attr('y', anchor.y - radius - 8)
        .attr('text-anchor', 'middle')
        .attr('fill', anchor.meta.color)
        .attr('font-size', 12)
        .attr('font-weight', 800)
        .attr('fill-opacity', 0.75)
        .text(anchor.meta.label)
    })

    ;[100, 205, 315].forEach((radius, index) => {
      svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', index === 0 ? '#38bdf8' : index === 1 ? '#d946ef' : '#22c55e')
        .attr('stroke-opacity', 0.09)
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '5,9')
    })

    const linkBaseOpacity = (link: RichLink) => {
      if (link.kind === 'identity') return 0.32
      if (link.kind === 'core') return link.strength > 0.45 ? 0.20 : 0.035
      return 0.10
    }

    const linkElements = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('x1', d => nodeById.get(d.sourceId)?.x || centerX)
      .attr('y1', d => nodeById.get(d.sourceId)?.y || centerY)
      .attr('x2', d => nodeById.get(d.targetId)?.x || centerX)
      .attr('y2', d => nodeById.get(d.targetId)?.y || centerY)
      .attr('stroke', d => d.color)
      .attr('stroke-opacity', d => linkBaseOpacity(d))
      .attr('stroke-width', d => d.width)
      .attr('stroke-linecap', 'round')

    const nodeGroups = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('mouseover', (event: any, d: RichNode) => {
        const relatedIds = new Set<string>([d.id])
        links.forEach(link => {
          if (link.sourceId === d.id || link.targetId === d.id) {
            relatedIds.add(link.sourceId)
            relatedIds.add(link.targetId)
          }
        })
        linkElements
          .transition().duration(130)
          .attr('stroke-opacity', link => link.sourceId === d.id || link.targetId === d.id ? 0.88 : 0.025)
          .attr('stroke-width', link => (link.sourceId === d.id || link.targetId === d.id ? link.width + 1.4 : Math.max(0.5, link.width * 0.42)))
        nodeGroups
          .transition().duration(130)
          .attr('opacity', node => relatedIds.has(node.id) ? 1 : 0.25)
        d3.select(event.currentTarget).transition().duration(150).attr('transform', `translate(${d.x}, ${d.y}) scale(1.12)`)
      })
      .on('mouseout', (event: any, d: RichNode) => {
        linkElements
          .transition().duration(170)
          .attr('stroke-opacity', link => linkBaseOpacity(link))
          .attr('stroke-width', link => link.width)
        nodeGroups.transition().duration(170).attr('opacity', 1)
        d3.select(event.currentTarget).transition().duration(150).attr('transform', `translate(${d.x}, ${d.y}) scale(1)`)
      })
      .on('click', (_, d: RichNode) => {
        setSelectedNode({
          node: d,
          capability: d.layer === 'capability' ? data.capabilities.find(cap => cap.id === d.id) : undefined,
          evidence: d.layer === 'evidence' ? data.evidence.find(evi => evi.id === d.id) : undefined
        })
      })

    nodeGroups.each(function(d: RichNode) {
      const group = d3.select(this)
      const size = d.size || 20
      const color = d.color || '#94a3b8'

      if (d.isCore && d.layer === 'capability') {
        group.append('circle').attr('r', size + 12).attr('fill', color).attr('fill-opacity', 0.08).attr('filter', 'url(#glow)')
        group.append('circle').attr('r', size + 6).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 1.3).attr('stroke-opacity', 0.55)
      }

      if (d.layer === 'center') {
        group.append('circle').attr('r', size).attr('fill', 'url(#centerGradient)').attr('filter', 'url(#glow)').attr('class', 'node-pulse')
        group.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('fill', 'white').attr('font-weight', 800).attr('font-size', d.label.length > 4 ? 14 : 16).text(d.label)
        return
      }

      if (d.layer === 'identity') {
        group.append('circle').attr('r', size).attr('fill', '#0ea5e9').attr('fill-opacity', 0.15).attr('stroke', '#38bdf8').attr('stroke-width', 1.8)
        group.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('fill', '#bae6fd').attr('font-size', 9.5).attr('font-weight', 700).text(shortLabel(d.label, 7))
        return
      }

      if (d.layer === 'capability') {
        const opacity = 0.18 + ((d.score || 50) / 100) * 0.36
        group.append('circle').attr('r', size).attr('fill', color).attr('fill-opacity', opacity).attr('stroke', color).attr('stroke-width', d.isCore ? 2.6 : 1.5).attr('stroke-opacity', d.isCore ? 0.92 : 0.62)
        group.append('text').attr('text-anchor', 'middle').attr('dy', '0.35em').attr('fill', '#f8fafc').attr('font-size', 10).attr('font-weight', 800).text(`${d.score}`)

        if (d.isCore || (d.score || 0) >= 78 || (d.evidenceCount || 0) >= 2) {
          const label = shortLabel(d.label, 9)
          const labelWidth = Math.max(54, label.length * 11 + 14)
          const labelY = size + 10
          group.append('rect')
            .attr('x', -labelWidth / 2)
            .attr('y', labelY)
            .attr('width', labelWidth)
            .attr('height', 20)
            .attr('rx', 10)
            .attr('fill', '#020617')
            .attr('fill-opacity', 0.76)
            .attr('stroke', color)
            .attr('stroke-opacity', 0.32)
          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('y', labelY + 14)
            .attr('fill', '#e2e8f0')
            .attr('font-size', 10)
            .attr('font-weight', 700)
            .text(label)
        }
        return
      }

      const impact = d.level || 5
      if (d.rawType === 'company') {
        group.append('rect')
          .attr('x', -size * 0.9)
          .attr('y', -size * 0.56)
          .attr('width', size * 1.8)
          .attr('height', size * 1.12)
          .attr('rx', 9)
          .attr('fill', color)
          .attr('fill-opacity', 0.13 + impact * 0.012)
          .attr('stroke', color)
          .attr('stroke-width', 1.1 + impact * 0.08)
      } else if (d.rawType === 'project') {
        group.append('path')
          .attr('d', `M0,${-size} L${size},0 L0,${size} L${-size},0 Z`)
          .attr('fill', color)
          .attr('fill-opacity', 0.13 + impact * 0.012)
          .attr('stroke', color)
          .attr('stroke-width', 1.1 + impact * 0.08)
      } else {
        group.append('circle')
          .attr('r', size)
          .attr('fill', color)
          .attr('fill-opacity', 0.12 + impact * 0.012)
          .attr('stroke', color)
          .attr('stroke-width', 1.1 + impact * 0.08)
      }

      if (impact >= 8) {
        const label = shortLabel(d.label, 6)
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('y', size + 14)
          .attr('fill', '#cbd5e1')
          .attr('font-size', 9)
          .attr('font-weight', 650)
          .text(label)
      }
    })

  }, [data, width, height, coreCapabilities])

  return (
    <div className="relative">
      <div className="mb-4 grid gap-3 rounded-2xl border border-slate-700/70 bg-slate-900/45 p-4 backdrop-blur-xl md:grid-cols-[160px_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-400">Core Gravity</p>
          <p className="mt-1 text-xs text-slate-500">核心能力不压在图上，先看摘要再读图。</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {coreCapabilities.map(({ cap, score }, index) => (
            <div key={cap.id} className="rounded-xl border border-slate-700/70 bg-slate-950/35 p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-xs font-bold text-primary-300">{index + 1}</span>
                  <span className="truncate text-sm font-semibold text-slate-100">{cap.name}</span>
                </div>
                <span className="text-xs font-bold text-amber-300">{score}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-amber-300" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-700/60 bg-slate-950/30 px-4 py-3 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">读图方式</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-sky-400" />数字=能力权重</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-amber-400" />大节点=核心能力</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-rose-400" />同色=能力方向</span>
        <span className="inline-flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-emerald-400" />悬停查看证据链</span>
      </div>

      <svg ref={svgRef} width={width} height={height} className="mx-auto" />

      {selectedNode && (
        <div className="absolute right-4 top-28 z-10 max-w-xs rounded-2xl border border-slate-600 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-semibold text-primary-400">{selectedNode.node.label}</h4>
              <p className="text-xs text-slate-500">
                {selectedNode.node.layer === 'center' ? '核心身份' : selectedNode.node.layer === 'identity' ? '基本信息' : selectedNode.node.layer === 'capability' ? '能力节点' : '证据节点'}
              </p>
            </div>
            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-300">✕</button>
          </div>

          {selectedNode.node.category && <p className="text-sm text-slate-400">分类: {selectedNode.node.category}</p>}
          {selectedNode.node.score !== undefined && <p className="text-sm text-slate-400">聚集权重: <span className="font-semibold text-amber-300">{selectedNode.node.score}</span></p>}

          {selectedNode.capability && (
            <div className="mt-3 border-t border-slate-700 pt-3">
              {selectedNode.capability.strength !== undefined && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs text-slate-500">强度</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                    <div className="h-full bg-gradient-to-r from-green-400 to-yellow-400" style={{ width: `${selectedNode.capability.strength}%` }} />
                  </div>
                  <span className="text-xs font-medium text-yellow-400">{selectedNode.capability.strength}%</span>
                </div>
              )}
              {selectedNode.capability.years !== undefined && <p className="text-xs text-slate-400">经验年限: {selectedNode.capability.years}年</p>}
              {selectedNode.capability.projectCount !== undefined && <p className="text-xs text-slate-400">项目数量: {selectedNode.capability.projectCount}个</p>}
              {selectedNode.capability.qualityScore !== undefined && <p className="text-xs text-slate-400">质量评分: {selectedNode.capability.qualityScore}/10</p>}
              <p className="mt-2 text-xs italic text-slate-300">“{selectedNode.capability.description}”</p>
            </div>
          )}

          {selectedNode.evidence && (
            <div className="mt-3 border-t border-slate-700 pt-3">
              <p className="text-xs text-slate-400">机构/来源: {selectedNode.evidence.organization}</p>
              <p className="text-xs text-slate-400">周期: {selectedNode.evidence.period}</p>
              {selectedNode.evidence.impactScore !== undefined && <p className="text-xs text-slate-400">影响力: {selectedNode.evidence.impactScore}/10</p>}
              <p className="mt-2 text-xs italic text-slate-300">“{selectedNode.evidence.description}”</p>
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 max-w-2xl -translate-x-1/2 rounded-full border border-slate-700/70 bg-slate-900/72 px-4 py-2 text-center text-xs text-slate-400 backdrop-blur-xl">
        默认降低连线和证据标签噪音 · 悬停节点时突出相关证据链 · 点击节点查看完整说明
      </div>
    </div>
  )
}
