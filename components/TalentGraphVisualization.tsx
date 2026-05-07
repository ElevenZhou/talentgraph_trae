'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { TalentGraphData, GraphNode, GraphLink } from '@/types'

interface Props {
  data: TalentGraphData;
  width?: number;
  height?: number;
}

export default function TalentGraphVisualization({ data, width = 800, height = 700 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [selectedNode, setSelectedNode] = useState<{ node: GraphNode; capability?: typeof data.capabilities[0] } | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const nodes: GraphNode[] = []
    const links: GraphLink[] = []

    nodes.push({
      id: 'center',
      label: data.identity.name,
      layer: 'center',
      x: width / 2,
      y: height / 2
    })

    const identityItems = [
      { label: data.identity.role, category: '职位' },
      { label: data.identity.location, category: '城市' },
      { label: data.identity.totalExperienceYears ? `${data.identity.totalExperienceYears}年经验` : (data.identity.availability === 'looking' ? '积极求职' : data.identity.availability === 'open' ? '开放机会' : '暂不考虑'), category: data.identity.totalExperienceYears ? '经验' : '状态' }
    ]

    identityItems.forEach((item, i) => {
      const angle = (i / identityItems.length) * 2 * Math.PI - Math.PI / 2
      const radius = 100
      nodes.push({
        id: `identity-${i}`,
        label: item.label,
        layer: 'identity',
        category: item.category,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius
      })
      links.push({ source: 'center', target: `identity-${i}`, strength: 0.9 })
    })

    const capabilitiesRadius = 200
    const capPerLayer = Math.min(data.capabilities.length, 12)
    data.capabilities.slice(0, capPerLayer).forEach((cap, i) => {
      const angle = (i / capPerLayer) * 2 * Math.PI
      const strength = cap.strength || 50
      const radius = capabilitiesRadius + (100 - strength) * 0.3
      nodes.push({
        id: cap.id,
        label: cap.name,
        layer: 'capability',
        category: cap.category,
        level: cap.strength || (cap.level === 'expert' ? 80 : cap.level === 'strong' ? 60 : cap.level === 'moderate' ? 40 : 20),
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius
      })
      links.push({ source: 'center', target: cap.id, strength: Math.min(0.9, (cap.strength || 50) / 100) })
    })

    const evidenceRadius = 310
    const evidencePerLayer = Math.min(data.evidence.length, 15)
    data.evidence.slice(0, evidencePerLayer).forEach((evi, i) => {
      const angle = (i / evidencePerLayer) * 2 * Math.PI + Math.PI / evidencePerLayer
      const impact = evi.impactScore || 5
      nodes.push({
        id: evi.id,
        label: evi.title,
        layer: 'evidence',
        category: evi.type,
        level: impact,
        x: width / 2 + Math.cos(angle) * (evidenceRadius + (10 - impact) * 3),
        y: height / 2 + Math.sin(angle) * (evidenceRadius + (10 - impact) * 3)
      })

      evi.capabilities.forEach(capName => {
        const foundCap = data.capabilities.find(c => c.name === capName || capName.includes(c.name) || c.name.includes(capName))
        if (foundCap) {
          const capStrength = foundCap.strength || 50
          links.push({ source: foundCap.id, target: evi.id, strength: (capStrength / 100) * 0.7 })
        } else {
          links.push({ source: 'center', target: evi.id, strength: 0.3 })
        }
      })
      if (evi.capabilities.length === 0) {
        links.push({ source: 'center', target: evi.id, strength: 0.3 })
      }
    })

    const defs = svg.append('defs')
    
    const gradient = defs.append('radialGradient').attr('id', 'centerGradient')
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#0ea5e9')
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#d946ef')

    const glowFilter = defs.append('filter').attr('id', 'glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur')
    const feMerge = glowFilter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(50).strength(0.1))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))

    for (let i = 0; i < 100; i++) {
      simulation.tick()
    }
    simulation.stop()

    const layerRadii = [80, 180, 280]
    layerRadii.forEach((radius, i) => {
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', radius)
        .attr('fill', 'none')
        .attr('stroke', i === 0 ? '#0ea5e9' : i === 1 ? '#d946ef' : '#22c55e')
        .attr('stroke-opacity', 0.15)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
    })

    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'connection-line')
      .attr('stroke', (d: GraphLink) => d.strength > 0.6 ? '#0ea5e9' : d.strength > 0.4 ? '#d946ef' : '#475569')
      .attr('stroke-opacity', (d: GraphLink) => d.strength * 0.7)
      .attr('stroke-width', (d: GraphLink) => Math.max(1, d.strength * 4))

    const nodeGroups = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`)
      .style('cursor', 'pointer')
      .on('mouseover', (event: any, d: GraphNode) => {
        d3.select(event.currentTarget).transition().duration(200).attr('transform', `translate(${d.x}, ${d.y}) scale(1.15)`)
      })
      .on('mouseout', (event: any, d: GraphNode) => {
        d3.select(event.currentTarget).transition().duration(200).attr('transform', `translate(${d.x}, ${d.y}) scale(1)`)
      })
      .on('click', (_, d: GraphNode) => {
        const capability = d.layer === 'capability' 
          ? data.capabilities.find(c => c.id === d.id) 
          : undefined
        setSelectedNode({ node: d, capability })
      })

    nodeGroups.each(function(d: GraphNode) {
      const group = d3.select(this)
      
      if (d.layer === 'center') {
        group.append('circle')
          .attr('r', 45)
          .attr('fill', 'url(#centerGradient)')
          .attr('filter', 'url(#glow)')
          .attr('class', 'node-pulse')
        
        const fontSize = d.label.length > 4 ? 14 : 16
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', 'white')
          .attr('font-weight', 'bold')
          .attr('font-size', fontSize)
          .text(d.label)
      } else if (d.layer === 'identity') {
        group.append('circle')
          .attr('r', 28)
          .attr('fill', '#0ea5e9')
          .attr('fill-opacity', 0.2)
          .attr('stroke', '#0ea5e9')
          .attr('stroke-width', 2)
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#7dd3fc')
          .attr('font-size', 10)
          .text(d.label.length > 6 ? d.label.slice(0, 6) + '…' : d.label)
      } else if (d.layer === 'capability') {
        const strength = d.level || 50
        const size = 12 + (strength / 100) * 20
        const opacity = 0.2 + (strength / 100) * 0.6
        const hue = strength > 70 ? 45 : strength > 40 ? 142 : 200
        const color = `hsl(${hue}, 80%, 50%)`
        
        group.append('circle')
          .attr('r', size)
          .attr('fill', color)
          .attr('fill-opacity', opacity)
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.8)
        
        if (strength > 70) {
          group.append('circle')
            .attr('r', size + 4)
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.3)
        }
        
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#e2e8f0')
          .attr('font-size', Math.max(8, 11 - (strength > 70 ? 2 : 0)))
          .text(d.label.length > 6 ? d.label.slice(0, 6) + '…' : d.label)
      } else {
        const impact = d.level || 5
        const size = 15 + impact * 1.5
        const opacity = 0.15 + (impact / 10) * 0.25
        const colors: Record<string, string> = {
          company: '#a78bfa', project: '#f472b6', education: '#34d399',
          certificate: '#fb923c', portfolio: '#2dd4bf'
        }
        const color = colors[d.category || 'company'] || '#64748b'
        
        group.append('circle')
          .attr('r', size)
          .attr('fill', color)
          .attr('fill-opacity', opacity)
          .attr('stroke', color)
          .attr('stroke-width', 1 + (impact / 10))
        group.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#94a3b8')
          .attr('font-size', 8)
          .text(d.label.length > 5 ? d.label.slice(0, 5) + '…' : d.label)
      }
    })

    const legendData = [
      { label: '中心层: 身份核心', color: '#0ea5e9' },
      { label: '一层: 基本信息', color: '#0ea5e9' },
      { label: '二层: 能力节点', color: '#d946ef' },
      { label: '三层: 项目证据', color: '#22c55e' }
    ]
    const legend = svg.append('g').attr('transform', `translate(${width - 160}, 30)`)
    legendData.forEach((item, i) => {
      const g = legend.append('g').attr('transform', `translate(0, ${i * 22})`)
      g.append('circle').attr('r', 5).attr('fill', item.color).attr('cx', 0).attr('cy', 0)
      g.append('text').attr('x', 15).attr('y', 4).attr('fill', '#94a3b8').attr('font-size', 11).text(item.label)
    })

    const strengthLegend = svg.append('g').attr('transform', `translate(${width - 160}, 130)`)
    strengthLegend.append('text').attr('x', 0).attr('y', 0).attr('fill', '#94a3b8').attr('font-size', 11).text('能力强度:')
    const strengthItems = [
      { size: 12, label: '弱', opacity: 0.3 },
      { size: 20, label: '中', opacity: 0.5 },
      { size: 28, label: '强', opacity: 0.8 }
    ]
    strengthItems.forEach((item, i) => {
      const g = strengthLegend.append('g').attr('transform', `translate(${i * 45}, 15)`)
      g.append('circle').attr('r', item.size / 2).attr('fill', '#fbbf24').attr('fill-opacity', item.opacity).attr('stroke', '#fbbf24').attr('stroke-opacity', 0.8)
      g.append('text').attr('x', 0).attr('y', 20).attr('fill', '#94a3b8').attr('font-size', 10).attr('text-anchor', 'middle').text(item.label)
    })

    linkElements
      .attr('x1', (d: any) => d.source.x)
      .attr('y1', (d: any) => d.source.y)
      .attr('x2', (d: any) => d.target.x)
      .attr('y2', (d: any) => d.target.y)

  }, [data, width, height])

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="mx-auto"
      />

      {selectedNode && (
        <div className="absolute top-4 left-4 max-w-xs p-4 rounded-xl bg-slate-800/95 border border-slate-600 backdrop-blur-xl">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-primary-400">{selectedNode.node.label}</h4>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-slate-300"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-slate-400">
            层级: {selectedNode.node.layer === 'center' ? '核心身份' : selectedNode.node.layer === 'identity' ? '基本信息' : selectedNode.node.layer === 'capability' ? '能力' : '项目证据'}
          </p>
          {selectedNode.node.category && (
            <p className="text-sm text-slate-400">分类: {selectedNode.node.category}</p>
          )}
          {selectedNode.capability && (
            <div className="mt-2 pt-2 border-t border-slate-700">
              {selectedNode.capability.strength !== undefined && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-500">强度:</span>
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all"
                      style={{ width: `${selectedNode.capability.strength}%` }}
                    />
                  </div>
                  <span className="text-xs text-yellow-400 font-medium">{selectedNode.capability.strength}%</span>
                </div>
              )}
              {selectedNode.capability.years !== undefined && (
                <p className="text-xs text-slate-400 mt-1">经验年限: {selectedNode.capability.years}年</p>
              )}
              {selectedNode.capability.projectCount !== undefined && (
                <p className="text-xs text-slate-400">项目数量: {selectedNode.capability.projectCount}个</p>
              )}
              {selectedNode.capability.qualityScore !== undefined && (
                <p className="text-xs text-slate-400">质量评分: {selectedNode.capability.qualityScore}/10</p>
              )}
              {selectedNode.capability.description && (
                <p className="text-xs text-slate-300 mt-2 italic">"{selectedNode.capability.description}"</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-slate-500 text-sm">
        💡 点击节点查看详情 | 节点越大、颜色越亮代表能力越强 | 连线越粗代表关联越强
      </div>
    </div>
  )
}
